/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import planningData from "../../mockdata/planning.json";
import calendarData from "../../mockdata/calendar.json";
import { SKU } from "./skuSlice";
import { StoreWithSeq } from "./storeSlice";

interface PlanningEntry {
  store: string;
  sku: string;
  skuID: string;
  storeID: string;
  [key: string]: string | number;
}

const initialState: { planning: PlanningEntry[] } = {
  planning: [],
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    calculatePlanningData: (
      state,
      action: PayloadAction<{ stores: StoreWithSeq[]; skus: SKU[], initialRender?: boolean }>
    ) => {
      // Prevent reloading if planning data already exists
      const { stores, skus, initialRender=false } = action.payload;
      
      if (initialRender && state.planning.length > 0) return;
      const planningMap: Record<string, any> = {};
      stores.forEach((store) => {
        skus.forEach((sku) => {
          const key = `${store.ID}-${sku.ID}`;
          if (!planningMap[key]) {
            planningMap[key] = {
              store: store.Label,
              sku: sku.Label,
              skuID: sku.ID,
              storeID: store.ID,
            };
          }
        });
      });

      const salesDataMap = planningData.reduce((acc, entry) => {
        acc[`${entry.Store}-${entry.SKU}-${entry.Week}`] = entry["Sales Units"];
        return acc;
      }, {} as Record<string, number>);

      Object.keys(planningMap).forEach((key) => {
        const [storeID, skuID] = key.split("-");
        const sku = skus.find((s) => s.ID === skuID);
        let hasSales = false;

        calendarData.forEach((week) => {
          const salesUnits = salesDataMap[`${storeID}-${skuID}-${week.Week}`] || 0;
          if (salesUnits > 0) hasSales = true;

          const salesDollars = sku ? salesUnits * sku.Price : 0;
          const gmDollars = sku ? salesDollars - salesUnits * sku.Cost : 0;
          const gmPercent = salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;

          planningMap[key][`salesUnits_${week.Week}`] = salesUnits;
          planningMap[key][`salesDollars_${week.Week}`] = salesDollars;
          planningMap[key][`gmDollars_${week.Week}`] = gmDollars;
          planningMap[key][`gmPercent_${week.Week}`] = gmPercent;
        });

        if (!hasSales) delete planningMap[key];
      });

      state.planning = Object.values(planningMap);
      console.log("updated")
    },

    updateSalesUnits: (
      state,
      action: PayloadAction<{ storeID: string; skuID: string; week: string; value: number; skus: SKU[] }>
    ) => {
      const { storeID, skuID, week, value, skus } = action.payload;
      
      // Find the entry to update
      const entryIndex = state.planning.findIndex((p) => p.storeID === storeID && p.skuID === skuID);
      if (entryIndex === -1) return;

      // Find the correct SKU for price and cost calculations
      const sku = skus.find((s) => s.ID === skuID);
      if (!sku) return;

      // Create a new object to ensure immutability
      const updatedEntry = {
        ...state.planning[entryIndex],
        [`salesUnits_${week}`]: value,
        [`salesDollars_${week}`]: value * sku.Price,
        [`gmDollars_${week}`]: value * sku.Price - value * sku.Cost,
        [`gmPercent_${week}`]: value * sku.Price !== 0 ? ((value * sku.Price - value * sku.Cost) / (value * sku.Price)) * 100 : 0,
      };

      // Replace the old entry with the new one
      state.planning[entryIndex] = updatedEntry;
    },
  },
});

export const { calculatePlanningData, updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;

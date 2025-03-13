import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import skusData from "../../mockdata/skus.json";

export interface SKU {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: number;
  Cost: number;
}

// Load from localStorage if available
const savedSKUs = localStorage.getItem("skus");
if (!savedSKUs){
  localStorage.setItem("skus", JSON.stringify(skusData));
} 

const initialState: { skus: SKU[] } = {
  skus: savedSKUs ? JSON.parse(savedSKUs) : skusData,
};

const skuSlice = createSlice({
  name: "sku",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
      localStorage.setItem("skus", JSON.stringify(state.skus));
    },
    deleteSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.ID !== action.payload);
      localStorage.setItem("skus", JSON.stringify(state.skus));
    },
    updateSKU: (state, action: PayloadAction<{ ID: string; field: string; value: string | number }>) => {
      state.skus = state.skus.map((sku) =>
        sku.ID === action.payload.ID
          ? { ...sku, [action.payload.field]: action.payload.value }
          : sku
      );
      localStorage.setItem("skus", JSON.stringify(state.skus));
    },
  },
});

export const { addSKU, deleteSKU, updateSKU } = skuSlice.actions;
export default skuSlice.reducer;

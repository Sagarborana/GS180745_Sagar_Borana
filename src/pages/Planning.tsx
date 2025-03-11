import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import storesData from "../mockdata/stores.json";
import skusData from "../mockdata/skus.json";
import calendarData from "../mockdata/calendar.json";
import planningData from "../mockdata/planning.json";

const PlanningPage: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    console.time("Processing Data");

    const gridDataMap: Record<string, any> = {};

    storesData.forEach((store) => {
      skusData.forEach((sku) => {
        const key = `${store.ID}-${sku.ID}`;
        if (!gridDataMap[key]) {
          gridDataMap[key] = {
            store: store.Label,
            sku: sku.Label,
          };
        }
      });
    });

    const planningMap = planningData.reduce((acc, entry) => {
      acc[`${entry.Store}-${entry.SKU}-${entry.Week}`] = entry["Sales Units"];
      return acc;
    }, {} as Record<string, number>);

    Object.keys(gridDataMap).forEach((key) => {
      const [storeID, skuID] = key.split("-");
      const sku = skusData.find((s) => s.ID === skuID);

      let hasSales = false; // Track if this Store-SKU has any sales

      calendarData.forEach((week) => {
        const salesUnits = planningMap[`${storeID}-${skuID}-${week.Week}`] || 0;

        if (salesUnits > 0) hasSales = true; // Mark as having sales

        const salesDollars = salesUnits * sku.Price;
        const gmDollars = salesDollars - (salesUnits * sku.Cost);
        const gmPercent = salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;

        gridDataMap[key][`salesUnits_${week.Week}`] = salesUnits;
        gridDataMap[key][`salesDollars_${week.Week}`] = salesDollars;
        gridDataMap[key][`gmDollars_${week.Week}`] = gmDollars;
        gridDataMap[key][`gmPercent_${week.Week}`] = gmPercent;
      });

      // Only adding to rowData if it has at least one non-zero sales week
      if (!hasSales) delete gridDataMap[key];
    });

    const gridData = Object.values(gridDataMap);

    console.timeEnd("Processing Data");

    setRowData(gridData);
  }, []);

  const columnDefsMemo = useMemo(() => {
    console.time("Building Columns");

    const monthMap: Record<string, any[]> = {};
    calendarData.forEach((week) => {
      const monthLabel = week["Month Label"]; 
      if (!monthMap[monthLabel]) {
        monthMap[monthLabel] = [];
      }
      monthMap[monthLabel].push(week);
    });

    const monthColumns = Object.keys(monthMap).map((monthLabel) => ({
      headerName: monthLabel, 
      children: monthMap[monthLabel].map((week) => ({
        headerName: week["Week Label"],
        children: [
          { headerName: "Sales Units", field: `salesUnits_${week.Week}`, editable: true, type: "numericColumn" },
          { headerName: "Sales Dollars", field: `salesDollars_${week.Week}`, valueFormatter: (params) => `$${params.value?.toFixed(2)}` },
          { headerName: "GM Dollars", field: `gmDollars_${week.Week}`, valueFormatter: (params) => `$${params.value?.toFixed(2)}` },
          { 
            headerName: "GM %",
            field: `gmPercent_${week.Week}`,
            valueFormatter: (params) => `${params.value?.toFixed(2)}%`,
            cellStyle: (params) => {
              const value = params.value;
              if (value >= 40) return { backgroundColor: "#44A248"};
              if (value >= 10) return { backgroundColor: "#FACC14" };
              if (value >= 5) return { backgroundColor: "#FB923C" };
              return { backgroundColor: "#FDA5A5"};
            },
          },
        ],
      })),
    }));

    console.timeEnd("Building Columns");

    return [
      { headerName: "Store", field: "store", rowGroup: true },
      { headerName: "SKU", field: "sku" },
      ...monthColumns,
    ];
  }, [calendarData]);

  return (
    <div className="ag-theme-quartz h-full w-full p-4">
      <AgGridReact rowData={rowData} columnDefs={columnDefsMemo} groupDisplayType="groupRows" animateRows={true} />
    </div>
  );
};

export default PlanningPage;

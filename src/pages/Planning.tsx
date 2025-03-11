/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import storesData from "../mockdata/stores.json";
import skusData from "../mockdata/skus.json";
import calendarData from "../mockdata/calendar.json";
import planningData from "../mockdata/planning.json";
import {
  CellClassParams,
  ClientSideRowModelModule,
  ColumnApiModule,
  ColumnAutoSizeModule,
  ModuleRegistry,
  NumberEditorModule,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  TextEditorModule,
  ValueFormatterParams,
} from "ag-grid-community";
import "../index.css";

ModuleRegistry.registerModules([
  ColumnApiModule,
  ColumnAutoSizeModule,
  ClientSideRowModelModule,
  TextEditorModule,
  NumberEditorModule
]);

const PlanningPage: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);

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
            skuID: sku.ID,
            storeID: store.ID,
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

      let hasSales = false;

      calendarData.forEach((week) => {
        const salesUnits = planningMap[`${storeID}-${skuID}-${week.Week}`] || 0;
        if (salesUnits > 0) hasSales = true;

        const salesDollars = sku ? salesUnits * sku.Price : 0;
        const gmDollars = sku ? salesDollars - salesUnits * sku.Cost : 0;
        const gmPercent = salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;

        gridDataMap[key][`salesUnits_${week.Week}`] = salesUnits;
        gridDataMap[key][`salesDollars_${week.Week}`] = salesDollars;
        gridDataMap[key][`gmDollars_${week.Week}`] = gmDollars;
        gridDataMap[key][`gmPercent_${week.Week}`] = gmPercent;
      });

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
      headerClass: "center-aligned-group-header",
      children: monthMap[monthLabel].map((week) => ({
        headerName: week["Week Label"],
        headerClass: "center-aligned-group-header",
        children: [
          {
            headerName: "Sales Units",
            field: `salesUnits_${week.Week}`,
            editable: true,
            type: "numericColumn",
          },
          {
            headerName: "Sales Dollars",
            field: `salesDollars_${week.Week}`,
            valueFormatter: (params: ValueFormatterParams) =>
              `$${params.value?.toFixed(2)}`,
          },
          {
            headerName: "GM Dollars",
            field: `gmDollars_${week.Week}`,
            valueFormatter: (params: ValueFormatterParams) =>
              `$${params.value?.toFixed(2)}`,
          },
          {
            headerName: "GM %",
            field: `gmPercent_${week.Week}`,
            valueFormatter: (params: ValueFormatterParams) =>
              `${params.value?.toFixed(2)}%`,
            cellStyle: (params: CellClassParams) => {
              const value = params.value;
              if (value >= 40) return { backgroundColor: "#44A248" };
              if (value >= 10) return { backgroundColor: "#FACC14" };
              if (value >= 5) return { backgroundColor: "#FB923C" };
              return { backgroundColor: "#FDA5A5" };
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
  }, []);

  /** 
   * Handles changes in editable fields and recalculates dependent values
   */
  const onCellValueChanged = (params: any) => {
    const { data, colDef, newValue } = params;

    if (colDef.field.startsWith("salesUnits_")) {
      const weekKey = colDef.field.replace("salesUnits_", ""); // Extract week number
      const sku = skusData.find((s) => s.ID === data.skuID);

      if (!sku) return;

      const updatedSalesUnits = Number(newValue) || 0;
      const updatedSalesDollars = updatedSalesUnits * sku.Price;
      const updatedGmDollars = updatedSalesDollars - updatedSalesUnits * sku.Cost;
      const updatedGmPercent =
        updatedSalesDollars !== 0 ? (updatedGmDollars / updatedSalesDollars) * 100 : 0;

      data[`salesUnits_${weekKey}`] = updatedSalesUnits;
      data[`salesDollars_${weekKey}`] = updatedSalesDollars;
      data[`gmDollars_${weekKey}`] = updatedGmDollars;
      data[`gmPercent_${weekKey}`] = updatedGmPercent;

      // Trigger grid update
      setRowData([...rowData]);
    }
  };

  const autoSizeStrategy = useMemo<
  | SizeColumnsToFitGridStrategy
  | SizeColumnsToFitProvidedWidthStrategy
  | SizeColumnsToContentStrategy
>(() => {
  return {
    type: "fitCellContents",
    includeHeaders: true,
  };
}, []);

  return (
    <div className="ag-theme-quartz h-full w-full p-4">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefsMemo}
        onCellValueChanged={onCellValueChanged}
        autoSizeStrategy={autoSizeStrategy}
      />
    </div>
  );
};

export default PlanningPage;

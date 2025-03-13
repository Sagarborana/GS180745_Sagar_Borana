/* eslint-disable @typescript-eslint/no-explicit-any */
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch, useSelector } from "react-redux";
import { calculatePlanningData, updateSalesUnits } from "../redux/slices/planningSlice.ts";
import { useEffect, useMemo } from "react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import calendarData from "../mockdata/calendar.json";
import {
  CellClassParams,
  CellStyleModule,
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
import { RootState } from "../redux/store/store";
import DefaultAgGrid from "../utils/DefaultAgGrid.tsx";

ModuleRegistry.registerModules([
  ColumnApiModule,
  ColumnAutoSizeModule,
  ClientSideRowModelModule,
  TextEditorModule,
  NumberEditorModule,
  CellStyleModule
]);
const PlanningPage: React.FC = () => {
  const dispatch = useDispatch();
  const planning = useSelector((state: RootState) => state.planning.planning);
  
  const planningData = planning.map((item: any) => ({ ...item }));
  const storesData = useSelector((state: RootState) => state.store.stores);
  const skusData = useSelector((state: RootState) => state.sku.skus);

  useEffect(() => {
    dispatch(calculatePlanningData({ stores: storesData, skus: skusData }));
  }, [storesData, skusData, dispatch]);

  const columnDefsMemo = useMemo(() => {
    const monthMap: Record<string, any[]> = {};
    calendarData.forEach((week) => {
      const monthLabel = week["Month Label"];
      if (!monthMap[monthLabel]) {
        monthMap[monthLabel] = [];
      }
      monthMap[monthLabel].push(week);
    });

    return [
      { headerName: "Store", field: "store"},
      { headerName: "SKU", field: "sku" },
      ...Object.keys(monthMap).map((monthLabel) => ({
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
            },
            {
              headerName: "Sales Dollars",
              field: `salesDollars_${week.Week}`,
              valueFormatter: (params: ValueFormatterParams) =>
                params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00",
            },
            {
              headerName: "GM Dollars",
              field: `gmDollars_${week.Week}`,
              valueFormatter: (params: ValueFormatterParams) =>
                params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00",
            },
            {
              headerName: "GM %",
              field: `gmPercent_${week.Week}`,
              valueFormatter: (params: ValueFormatterParams) =>
                params.value ? `${params.value.toFixed(2)}%` : "0.00%",
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
      })),
    ];
  }, []);

  const onCellValueChanged = (params: any) => {
    const { data, colDef, newValue } = params;
    if (colDef.field.startsWith("salesUnits_")) {
      const week = colDef.field.replace("salesUnits_", "");
      
      dispatch(updateSalesUnits({
        storeID: data.storeID,
        skuID: data.skuID,
        week,
        value: Number(newValue) || 0,
        skus: skusData, // ✅ Pass SKU data for correct calculations
      }));
    }
  };

  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: "fitCellContents",
    };
  }, []);

  return (
    <div className="ag-theme-quartz h-full w-full p-4">
      <DefaultAgGrid
        rowData={planningData}
        columnDefs={columnDefsMemo}
        onCellValueChanged={onCellValueChanged}
        animateRows={true}
        autoSizeStrategy={autoSizeStrategy}
      />
    </div>
  );
};

export default PlanningPage;

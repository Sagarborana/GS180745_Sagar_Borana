import React from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ModuleRegistry, AllCommunityModule, themeQuartz } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  headerTextColor: '#707171',
  headerBackgroundColor: '#F5F7F7',
});

const DefaultAgGrid = React.forwardRef<AgGridReact, AgGridReactProps>(
    ({ defaultColDef, ...rest }) => {
  
      const mergedDefaultColDef = {
        cellStyle: { textAlign: "left" },
        filter: true,
        sortable: true,
        resizable: true,
        suppressHeaderMenuButton: true,
        filterParams: {
          buttons: ["apply", "cancel"],
        },
        ...defaultColDef,
      };
  
      return (
        <AgGridReact
          rowModelType="clientSide"
          defaultColDef={mergedDefaultColDef}
          theme={myTheme}
          {...rest}
        />
      );
    }
  );
  
  export default DefaultAgGrid;
  

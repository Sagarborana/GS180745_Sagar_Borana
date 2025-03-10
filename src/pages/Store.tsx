import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, RowDragModule } from "ag-grid-community";
import { ClientSideRowModelModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([RowDragModule, ClientSideRowModelModule]);

const StorePage: React.FC = () => {
    
  const rowData = [
    { id: "ST035", label: "San Francisco Bay Trends", city: "San Francisco", state: "CA"},
    { id: "ST046", label: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
  ];

  const columnDefs: ColDef[] = [
    { headerName: "Store", field: "label", rowDrag: true },
    { headerName: "City", field: "city" },
    { headerName: "State", field: "state" },
  ];

  return (
    <div className="p-4 w-full">
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} rowDragManaged={true} rowModelType="clientSide"/>
    </div>
      <button className="mt-4 p-2 bg-orange-400 text-white rounded">New Store</button>
      </div>
  );
};
export default StorePage;

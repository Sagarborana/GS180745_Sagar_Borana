import { useState } from "react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ColumnApiModule,
  ColumnAutoSizeModule,
  NumberEditorModule,
  TextEditorModule,
} from "ag-grid-community";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { addSKU, deleteSKU, SKU, updateSKU } from "../redux/slices/skuSlice.ts";
import DefaultAgGrid from "../utils/DefaultAgGrid.tsx";
import AddNewItem from "../components/AddNewItem.tsx";

ModuleRegistry.registerModules([
  ColumnApiModule,
  ColumnAutoSizeModule,
  ClientSideRowModelModule,
  TextEditorModule,
  NumberEditorModule,
]);

const SKUPage: React.FC = () => {
  const dispatch = useDispatch();
  const sku = useSelector((state: RootState) => state.sku.skus);
  const skus = sku.map((unit: SKU) => ({ ...unit }));
  
  const [showPopup, setShowPopup] = useState(false);

  const deleteRow = (id: string) => {
    dispatch(deleteSKU(id));
  };

  const addNewSKU = (newSKU: { ID: string, Label: string, Class: string, Department: string, Cost: number | string, Price: number | string }) => {

    const isDuplicate = skus.some((SKU) => SKU.ID === newSKU.ID);
    if (isDuplicate) {
      alert("SKU ID already exists! Please enter a unique ID.");
      return;
    }

    const formattedSKU = {
      ...newSKU,
      Cost: newSKU.Cost === "" ? 0 : Number(newSKU.Cost),
      Price: newSKU.Price === "" ? 0 : Number(newSKU.Price),
    };

    dispatch(addSKU(formattedSKU));
    setShowPopup(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCellValueChanged = (params: any) => {
    const { data, colDef, newValue } = params;
    dispatch(updateSKU({ ID: data.ID, field: colDef.field!, value: newValue }));
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "",
      field: "actions",
      width: 60,
      filter: false, 
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => (
        <button
          onClick={() => deleteRow(params.data["ID"])}
          className="text-red-500 hover:text-red-700"
        >
          <MdDeleteOutline size={24} color="black" />
        </button>
      ),
    },
    { headerName: "SKU", field: "Label", editable:  true },
    { headerName: "Price", field: "Price", editable: true },
    { headerName: "Cost", field: "Cost", editable: true },
  ];

  return (
    <div className="p-4 w-full">
      <div className="ag-theme-quartz h-[calc(100%-60px)] w-full">
        <DefaultAgGrid
          rowData={skus}
          columnDefs={columnDefs}
          onCellValueChanged={onCellValueChanged}
        />
      </div>

      <button onClick={() => setShowPopup(true)} className="mt-4 p-2 bg-orange-400 text-white rounded cursor-pointer">
        New SKU
      </button>
      {showPopup && (
        <AddNewItem
          title="Add New SKU"
          fields={[
            { key: "ID", placeholder: "SKU ID" },
            { key: "Label", placeholder: "SKU Label" },
            { key: "Class", placeholder: "Class" },
            { key: "Department", placeholder: "Department" },
            { key: "Cost", placeholder: "Cost", type: "number" },
            { key: "Price", placeholder: "Price", type: "number" },
          ]}
          onSave={addNewSKU}
          onClose={() => setShowPopup(false)}
          initialState={{ ID: "", Label: "", Class: "", Department: "", Cost: "", Price: "" }}
        />
      )}
    </div>
  );
};

export default SKUPage;

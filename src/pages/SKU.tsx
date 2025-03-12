import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
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
  const [newSKU, setNewSKU] = useState<SKU>({
    ID: "",
    Label: "",
    Class: "",
    Department: "",
    Price: 0,
    Cost: 0,
  });

  const deleteRow = (id: string) => {
    dispatch(deleteSKU(id));
  };

  const addNewSKU = () => {
    if (
      !newSKU.ID ||
      !newSKU.Label ||
      !newSKU.Class ||
      !newSKU.Department ||
      !newSKU.Cost ||
      !newSKU.Price
    ) {
      alert("Please fill all fields!");
      return;
    }

    const isDuplicate = skus.some((SKU) => SKU.ID === newSKU.ID);
    if (isDuplicate) {
      alert("SKU ID already exists! Please enter a unique ID.");
      return;
    }

    dispatch(addSKU(newSKU));
    setShowPopup(false);
    setNewSKU({
      ID: "",
      Label: "",
      Class: "",
      Department: "",
      Price: 0,
      Cost: 0,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCellValueChanged = (params: any) => {
    console.log(params);
    const { data, colDef, newValue } = params;
    console.log({ ID: data.ID, field: colDef.field!, value: newValue });
    dispatch(updateSKU({ ID: data.ID, field: colDef.field!, value: newValue }));
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "",
      field: "actions",
      width: 60,
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
        <AgGridReact
          rowData={skus}
          columnDefs={columnDefs}
          rowModelType="clientSide"
          onCellValueChanged={onCellValueChanged}
        />
      </div>

      <button
        onClick={() => setShowPopup(true)}
        className="mt-4 p-2 bg-orange-400 text-white rounded"
      >
        New SKU
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New SKU</h2>
            <input
              type="text"
              placeholder="SKU ID"
              className="border p-2 w-full mb-2"
              value={newSKU.ID}
              onChange={(e) => setNewSKU({ ...newSKU, ID: e.target.value })}
            />
            <input
              type="text"
              placeholder="Label"
              className="border p-2 w-full mb-2"
              value={newSKU.Label}
              onChange={(e) => setNewSKU({ ...newSKU, Label: e.target.value })}
            />
            <input
              type="text"
              placeholder="Class"
              className="border p-2 w-full mb-2"
              value={newSKU.Class}
              onChange={(e) => setNewSKU({ ...newSKU, Class: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department"
              className="border p-2 w-full mb-4"
              value={newSKU.Department}
              onChange={(e) =>
                setNewSKU({ ...newSKU, Department: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Cost"
              className="border p-2 w-full mb-4"
              value={newSKU.Cost}
              onChange={(e) =>
                setNewSKU({ ...newSKU, Cost: parseInt(e.target.value) })
              }
            />
            <input
              type="text"
              placeholder="Price"
              className="border p-2 w-full mb-4"
              value={newSKU.Price}
              onChange={(e) =>
                setNewSKU({ ...newSKU, Price: parseInt(e.target.value) })
              }
            />
            <div className="flex justify-between">
              <button
                onClick={addNewSKU}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add SKU
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SKUPage;

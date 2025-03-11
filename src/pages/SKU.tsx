import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { ClientSideRowModelModule, ModuleRegistry } from "ag-grid-community";
import { RowNumbersModule } from "ag-grid-enterprise";
import { MdDeleteOutline } from "react-icons/md";
import skusData from "../mockdata/skus.json";

ModuleRegistry.registerModules([ClientSideRowModelModule, RowNumbersModule]);

const SKUPage: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newSKU, setNewSKU] = useState({
    ID: "",
    Label: "",
    Class: "",
    Department: "",
    Price: "",
    Cost: "",
  });

  useEffect(() => {
    setRowData(skusData);
  }, []);

  const deleteRow = (id: string) => {
    setRowData((prevData) => prevData.filter((row) => row["ID"] !== id));
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

    const isDuplicate = rowData.some((SKU) => SKU["ID"] === newSKU.ID);
    if (isDuplicate) {
      alert("SKU ID already exists! Please enter a unique ID.");
      return;
    }

    setRowData((prevData) => [...prevData, newSKU]);
    setShowPopup(false);
    setNewSKU({
      ID: "",
      Label: "",
      Class: "",
      Department: "",
      Price: "",
      Cost: "",
    });
  };

  const columnDefs: ColDef[] = [
    { headerName: "SKU", field: "Label" },
    { headerName: "Price", field: "Price" },
    { headerName: "Cost", field: "Cost" },
    {
      headerName: "",
      field: "actions",
      width: 60,
      cellRenderer: (params: ICellRendererParams) => (
        <button
          onClick={() => deleteRow(params.data["ID"])}
          className="text-red-500 hover:text-red-700 hover:cursor-pointer"
        >
          <MdDeleteOutline size={24} color="black" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 w-full">
      <div className="ag-theme-quartz h-[calc(100%-60px)] w-full">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowModelType="clientSide"
        />
      </div>

      <button
        onClick={() => setShowPopup(true)}
        className="mt-4 p-2 bg-orange-400 text-white rounded"
      >
        New SKU
      </button>

      {/* Popup for Adding New SKU */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
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
              onChange={(e) => setNewSKU({ ...newSKU, Cost: e.target.value })}
            />
            <input
              type="text"
              placeholder="Price"
              className="border p-2 w-full mb-4"
              value={newSKU.Price}
              onChange={(e) => setNewSKU({ ...newSKU, Price: e.target.value })}
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

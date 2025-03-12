/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  ICellRendererParams,
  RowDragModule,
} from "ag-grid-community";
import { ClientSideRowModelModule, ModuleRegistry } from "ag-grid-community";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { addStore, deleteStore } from "../redux/slices/storeSlice.ts";
import DefaultAgGrid from "../utils/DefaultAgGrid.tsx";

ModuleRegistry.registerModules([RowDragModule, ClientSideRowModelModule]);

const StorePage: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.store.stores);

  const [showPopup, setShowPopup] = useState(false);
  const [newStore, setNewStore] = useState({
    ID: "",
    Label: "",
    City: "",
    State: "",
  });

  const handleDelete = (id: string) => {
    dispatch(deleteStore(id));
  };

  const handleAddStore = () => {
    if (!newStore.ID || !newStore.Label || !newStore.City || !newStore.State) {
      alert("Please fill all fields!");
      return;
    }

    // Check if ID already exists
    const isDuplicate = stores.some((store) => store.ID === newStore.ID);
    if (isDuplicate) {
      alert("Store ID already exists! Please enter a unique ID.");
      return;
    }

    dispatch(addStore(newStore));
    setShowPopup(false);
    setNewStore({ ID: "", Label: "", City: "", State: "" });
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
          onClick={() => handleDelete(params.data.ID)}
          className="text-red-500 hover:text-red-700 hover:cursor-pointer"
        >
          <MdDeleteOutline size={24} color="black" />
        </button>
      ),
    },
    { headerName: "S.No", field: "seqId", width: 100, rowDrag: true, filter: false, sortable: false },
    { headerName: "Store", field: "Label" },
    { headerName: "City", field: "City" },
    { headerName: "State", field: "State" },
  ];

  return (
    <div className="p-4 w-full">
      <div className="ag-theme-quartz h-[calc(100%-60px)] w-full">
        <DefaultAgGrid
          rowData={stores.map((store, index) => ({
            ...store,
            seqId: index + 1,
          }))}
          columnDefs={columnDefs}
          rowDragManaged={true}
        />
      </div>

      <button
        onClick={() => setShowPopup(true)}
        className="mt-4 p-2 bg-orange-400 text-white rounded"
      >
        New Store
      </button>

      {/* Popup for Adding New Store */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Store</h2>
            <input
              type="text"
              placeholder="Store ID"
              className="border p-2 w-full mb-2"
              value={newStore.ID}
              onChange={(e) => setNewStore({ ...newStore, ID: e.target.value })}
            />
            <input
              type="text"
              placeholder="Label"
              className="border p-2 w-full mb-2"
              value={newStore.Label}
              onChange={(e) =>
                setNewStore({ ...newStore, Label: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              className="border p-2 w-full mb-2"
              value={newStore.City}
              onChange={(e) =>
                setNewStore({ ...newStore, City: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="State"
              className="border p-2 w-full mb-4"
              value={newStore.State}
              onChange={(e) =>
                setNewStore({ ...newStore, State: e.target.value })
              }
            />
            <div className="flex justify-between">
              <button
                onClick={handleAddStore}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Store
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

export default StorePage;

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
import AddNewItem from "../components/AddNewItem";

ModuleRegistry.registerModules([RowDragModule, ClientSideRowModelModule]);

const StorePage: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.store.stores);

  const [showPopup, setShowPopup] = useState(false);

  // Function to add new store
  const handleAddStore = (newStore: { ID: string; Label: string; City: string; State: string }) => {
    if (stores.some((store) => store.ID === newStore.ID)) {
      alert("Store ID already exists! Please enter a unique ID.");
      return;
    }

    dispatch(addStore(newStore));
    setShowPopup(false);
  };

  // Function to delete a store
  const handleDelete = (id: string) => {
    dispatch(deleteStore(id));
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "",
      field: "actions",
      width: 60,
      filter: false,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => (
        <button onClick={() => handleDelete(params.data.ID)} className="text-red-500 hover:text-red-700">
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
          rowData={stores.map((store, index) => ({ ...store, seqId: index + 1 }))}
          columnDefs={columnDefs}
          rowDragManaged={true}
        />
      </div>

      <button onClick={() => setShowPopup(true)} className="mt-4 p-2 bg-orange-400 text-white rounded cursor-pointer">
        New Store
      </button>

      {/* opens dialog to add a new store */}
      {showPopup && (
        <AddNewItem
          title="Add New Store"
          fields={[
            { key: "ID", placeholder: "Store ID" },
            { key: "Label", placeholder: "Store Label" },
            { key: "City", placeholder: "City" },
            { key: "State", placeholder: "State" },
          ]}
          onSave={handleAddStore}
          onClose={() => setShowPopup(false)}
          initialState={{ ID: "", Label: "", City: "", State: "" }}
        />
      )}
    </div>
  );
};

export default StorePage;

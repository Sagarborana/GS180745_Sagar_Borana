import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storesData from "../../mockdata/stores.json";

interface Store {
    ID: string;
    Label: string;
    City: string;
    State: string;
}

export interface StoreWithSeq {
    ID: string;
    Label: string;
    City: string;
    State: string;
    seqId: number;
}
// Load data from localStorage if available
const savedStores = localStorage.getItem("stores");
const initialState: { stores: StoreWithSeq[] } = {
  stores: savedStores ? JSON.parse(savedStores) : storesData.map((store, index) => ({
    ...store,
    seqId: index + 1, // Assign seqId initially
  })),
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      const newStore = { ...action.payload, seqId: state.stores.length + 1 };
      state.stores.push(newStore);
      localStorage.setItem("stores", JSON.stringify(state.stores));
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((store) => store.ID !== action.payload);
      // Reassign seqId after deletion
      state.stores.forEach((store, index) => {
        store.seqId = index + 1;
      });
      localStorage.setItem("stores", JSON.stringify(state.stores));
    },
  },
});

export const { addStore, deleteStore } = storeSlice.actions;
export default storeSlice.reducer;

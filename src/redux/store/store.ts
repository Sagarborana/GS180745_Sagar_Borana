// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import skuReducer from "../slices/skuSlice";
import storeReducer from "../slices/storeSlice";

export const store = configureStore({
  reducer: {
    sku: skuReducer,
    store: storeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

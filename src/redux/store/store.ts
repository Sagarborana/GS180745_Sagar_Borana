// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import skuReducer from "../slices/skuSlice";
import storeReducer from "../slices/storeSlice";
import planningReducer from "../slices/planningSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    sku: skuReducer,
    store: storeReducer,
    planning: planningReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

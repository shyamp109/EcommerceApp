import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { reducers } from "./reducers";
import thunk from "redux-thunk"
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "cartSlice", "category"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

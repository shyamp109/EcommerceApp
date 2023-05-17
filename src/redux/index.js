import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import { reducers } from './reducers';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth','cart'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
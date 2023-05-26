import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import productDetailsSlice from "./productDetailsSlice";
import categorySlice from "./categorySlice";
import orderHistroySlice from "./orderHistrory";
export const reducers = combineReducers({
  auth: authSlice,
  cartSlice: cartSlice,
  productList: productSlice,
  productDetailsSlice: productDetailsSlice,
  categoryProduct: categorySlice,
  orderHistroy: orderHistroySlice,
});

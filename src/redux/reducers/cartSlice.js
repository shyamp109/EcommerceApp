import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async () => {
    try {
      const responce = await api.cart.get();
      // console.log(responce.data.data);
      return responce.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
);

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    // cartData: (state, action) => {
    //   state.cart = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});
export const { cartData } = cartSlice.actions;
export default cartSlice.reducer;

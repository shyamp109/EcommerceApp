import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (data) => {
    try {
      const response = await api.product.get(data);
      // console.log(response.data.data.product);
      return response.data.data.product;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  product: [],
};

const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;

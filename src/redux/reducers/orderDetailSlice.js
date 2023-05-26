import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const fetchOrderHistroy = createAsyncThunk(
  "order/fetchOrderHistroy",
  async () => {
    try {
      const response = await api.order.get();
      console.log(response.data.data);
      return response?.data?.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  orderHistroyData: [],
};

const orderHistroySlice = createSlice({
  name: "orderHistroySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderHistroy.fulfilled, (state, action) => {
      console.log(action.payload);
      state.orderHistroyData = action.payload;
    });
  },
});

export default orderHistroySlice.reducer;

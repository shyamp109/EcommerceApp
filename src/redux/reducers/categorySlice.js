import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const fetchCategoryProduct = createAsyncThunk(
  "categroy/fetchCategoryProduct",
  async (data) => {
    try {
      const response = await api.category.get(data);
      console.log("data", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("abc", error);
    }
  }
);
const initialState = {
  categoryProduct: [],
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default categorySlice.reducer;

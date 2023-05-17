import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { api } from '../../api';

export const fetchProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (productId) => {
    try {
      const response = await api.product.getProductById(productId); 
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

const initialState = {
    productSignleData:[],
  };
  
  const productDetailsSlice = createSlice({
    name: "productDetailsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  
    
  });
  
  export default productDetailsSlice.reducer;
  
  
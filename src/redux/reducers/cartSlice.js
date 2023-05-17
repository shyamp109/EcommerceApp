import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../api';
export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (userId) => {
    try { 
      const responce = await api.cart.get(userId);
      return responce.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },
);

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      state.cart=action.payload;
    });
  },
});

export default cartSlice.reducer;

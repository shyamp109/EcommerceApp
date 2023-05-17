import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {token:null},
  userInfo: {}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      userToken: (state, action) => {
          state.user = action.payload;
      },
      userData: (state, action) => {
          state.userInfo = action.payload;
      }
  }
});

export const { userToken,userData } = authSlice.actions;

export default authSlice.reducer;
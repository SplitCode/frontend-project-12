import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') ?? null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      return { ...state, token: action.payload };
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('chat-token') || null,
  username: localStorage.getItem('chat-username') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('chat-token', action.payload);
    },
    setUsername(state, action) {
      state.username = action.payload;
      localStorage.setItem('chat-username', action.payload);
    },
  },
});

export const selectToken = (state) => state.auth.token;
export const selectUsername = (state) => state.auth.username;

export const { setToken, setUsername } = authSlice.actions;
export default authSlice.reducer;

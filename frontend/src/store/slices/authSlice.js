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
    setUserData(state, { payload }) {
      const { token, username } = payload;
      localStorage.setItem('chat-token', token);
      localStorage.setItem('chat-username', username);
      state.token = token;
      state.username = username;
    },
  },
});

export const selectToken = (state) => state.auth.token;
export const selectUsername = (state) => state.auth.username;

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;

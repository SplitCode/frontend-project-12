/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TOKEN, USERNAME } from './constants';

const initialState = {
  token: localStorage.getItem(TOKEN) || null,
  username: localStorage.getItem(USERNAME) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, { payload }) {
      const { token, username } = payload;
      localStorage.setItem(TOKEN, token);
      localStorage.setItem(USERNAME, username);
      state.token = token;
      state.username = username;
    },
  },
});

export const selectToken = (state) => state.auth.token;
export const selectUsername = (state) => state.auth.username;

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;

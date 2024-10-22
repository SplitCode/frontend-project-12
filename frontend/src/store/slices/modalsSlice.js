/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  // modalType: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
      console.log(state.showModal);
      // state.modalType = action.payload.modalType;
    },
  },
});

export const { setShowModal } = modalsSlice.actions;
export default modalsSlice.reducer;

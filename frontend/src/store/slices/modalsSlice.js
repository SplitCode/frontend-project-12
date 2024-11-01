/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: '',
  modalChannelId: '',
  modalChanneName: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setChannelModal: (state, { payload }) => {
      state.showModal = payload.modalName;
      state.modalChannelId = payload.id;
      state.modalChannelName = payload.name;
    },
  },
});

export const selectModal = (state) => state.modals.showModal;
export const selectModalChannelId = (state) => state.modals.modalChannelId;
export const selectModalChannelName = (state) => state.modals.modalChannelName;

export const { setChannelModal } = modalsSlice.actions;
export default modalsSlice.reducer;

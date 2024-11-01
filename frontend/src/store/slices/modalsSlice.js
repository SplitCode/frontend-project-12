/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: '',
  channelId: '',
  channeName: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.showModal = payload.modalName;
      state.channelId = payload.id;
      state.channelName = payload.name;
    },
    closeModal: () => initialState,
  },
});

export const selectModal = (state) => state.modals.showModal;
export const selectChannelId = (state) => state.modals.channelId;
export const selectChannelName = (state) => state.modals.channelName;

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;

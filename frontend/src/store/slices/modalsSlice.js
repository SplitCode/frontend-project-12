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
    setChannelModal: (state, action) => {
      state.showModal = action.payload.modalName;
      state.modalChannelId = action.payload.id;
      state.modalChannelName = action.payload.name;
    },
  },
});

export const { setChannelModal } = modalsSlice.actions;
export default modalsSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import DEFAULT_CHANNEL from '../../constants/defaultChannel';

const initialState = {
  currentChannel: DEFAULT_CHANNEL,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

export const { setCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;

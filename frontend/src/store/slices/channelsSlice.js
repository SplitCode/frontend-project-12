/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CHANNEL } from './constants';

const initialState = {
  currentChannel: DEFAULT_CHANNEL,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentChannel = payload;
    },
  },
});

export const selectCurrentChannel = (state) => state.channel.currentChannel;
export const selectCurrentChannelId = (state) => state.channel.currentChannel.id;

export const { setCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from '../api/getChannels';

import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware),
});

export default store;

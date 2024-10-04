import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from '../api/channelsApi';

import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware),
});

export default store;

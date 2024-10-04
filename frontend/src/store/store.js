import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from '../api/channelsApi';
import { messagesApi } from '../api/messagesApi';

import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from '../api/channelsApi';
import { messagesApi } from '../api/messagesApi';
import { authApi } from '../api/authApi';

import authReducer from './slices/authSlice';
import channelReducer from './slices/channelsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    channelsApi.middleware,
    messagesApi.middleware,
    authApi.middleware,
  ),
});

export default store;

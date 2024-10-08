import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from '../api/channelsApi';
import { messagesApi } from '../api/messagesApi';
import { authApi } from '../api/authApi';

import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware, authApi.middleware),
});

export default store;

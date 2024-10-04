import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiPath from './apiPath';

export const usersApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ baseUrl: apiPath.channels() }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
  }),
});

export const {
  useGetChannelsQuery,
} = usersApi;

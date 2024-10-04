import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../helpers/prepareHeaders';
import apiPath from './apiPath';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ baseUrl: apiPath.messages(), prepareHeaders }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
  }),
});

export const {
  useGetMessagesQuery,
} = messagesApi;

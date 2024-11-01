import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from './helpers';
import { MESSAGES_PATH, getApiPath } from './apiPath';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiPath(MESSAGES_PATH),
    prepareHeaders,
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: (result) => (result
        ? [...result.map(({ id }) => ({ type: 'Messages', id })), { type: 'Messages', id: 'LIST' }]
        : [{ type: 'Messages', id: 'LIST' }]),
    }),

    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),

    removeMessage: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: id,
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;

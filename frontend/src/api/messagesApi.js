import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../helpers/prepareHeaders';
import { getApiPath } from './apiPath';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiPath('BASE'),
    prepareHeaders,
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => getApiPath('MESSAGES'),
      providesTags: (result) => (result
        ? [...result.map(({ id }) => ({ type: 'Messages', id })), { type: 'Messages', id: 'LIST' }]
        : [{ type: 'Messages', id: 'LIST' }]),
    }),

    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        url: getApiPath('MESSAGES'),
        body: message,
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),

    removeMessage: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `${getApiPath('MESSAGES')}/${id}`,
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;

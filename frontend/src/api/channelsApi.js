import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from './helpers/prepareHeaders';
import getApiPath from '../constants/apiPath';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiPath('CHANNELS'),
    prepareHeaders,
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: (result) => (result
        ? [...result.map(({ id }) => ({ type: 'Channels', id })), { type: 'Channels', id: 'LIST' }]
        : [{ type: 'Channels', id: 'LIST' }]),
    }),

    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),

    removeChannel: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: id,
      }),
      invalidatesTags: (id) => [{ type: 'Channels', id }],
    }),

    editChannel: builder.mutation({
      query: (channel) => ({
        method: 'PATCH',
        url: channel.id,
        body: channel,
      }),
      invalidatesTags: ({ id }) => [{ type: 'Channels', id }],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
} = channelsApi;

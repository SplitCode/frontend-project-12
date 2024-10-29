import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../helpers/prepareHeaders';
import { getApiPath } from './apiPath';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiPath('BASE'),
    prepareHeaders,
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => getApiPath('CHANNELS'),
      providesTags: (result) => (result
        ? [...result.map(({ id }) => ({ type: 'Channels', id })), { type: 'Channels', id: 'LIST' }]
        : [{ type: 'Channels', id: 'LIST' }]),
    }),

    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        url: getApiPath('CHANNELS'),
        body: channel,
      }),
      invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),

    removeChannel: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `${getApiPath('CHANNELS')}/${id}`,
      }),
      invalidatesTags: (id) => [{ type: 'Channels', id }],
    }),

    editChannel: builder.mutation({
      query: (channel) => ({
        method: 'PATCH',
        url: `${getApiPath('CHANNELS')}/${channel.id}`,
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

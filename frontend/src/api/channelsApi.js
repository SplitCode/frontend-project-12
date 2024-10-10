import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../helpers/prepareHeaders';
import apiPath from './apiPath';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath.channels(),
    prepareHeaders,
    tagTypes: ['Channels'],
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
  }),
});

export const { useGetChannelsQuery, useAddChannelMutation } = channelsApi;

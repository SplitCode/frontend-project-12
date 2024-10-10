import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../helpers/prepareHeaders';
import apiPath from './apiPath';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath.default(),
    prepareHeaders,
    tagTypes: ['Auth'],
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        method: 'POST',
        url: '/login',
        body: user,
      }),
    }),
    signup: builder.mutation({
      query: ({ username, password }) => ({
        method: 'POST',
        url: '/signup',
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

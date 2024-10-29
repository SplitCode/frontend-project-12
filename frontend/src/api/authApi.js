import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../helpers/prepareHeaders';
import { getApiPath } from './apiPath';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiPath('BASE'),
    prepareHeaders,
    tagTypes: ['Auth'],
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        method: 'POST',
        url: getApiPath('LOGIN'),
        body: user,
      }),
    }),
    signup: builder.mutation({
      query: ({ username, password }) => ({
        method: 'POST',
        url: getApiPath('SIGNUP'),
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

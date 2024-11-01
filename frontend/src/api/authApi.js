import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from './helpers';
import {
  BASE_PATH, LOGIN_PATH, SIGNUP_PATH, getApiPath,
} from './apiPath';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiPath(BASE_PATH),
    prepareHeaders,
    tagTypes: ['Auth'],
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        method: 'POST',
        url: getApiPath(LOGIN_PATH),
        body: user,
      }),
    }),
    signup: builder.mutation({
      query: ({ username, password }) => ({
        method: 'POST',
        url: getApiPath(SIGNUP_PATH),
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

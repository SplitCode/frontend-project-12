import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import prepareHeaders from '../helpers/prepareHeaders';
import apiPath from './apiPath';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath.login(),
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

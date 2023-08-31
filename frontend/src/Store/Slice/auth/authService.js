import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_HOST}`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.access
      if (accessToken) {
        headers.set('Authorization', `JWT ${accessToken}`)
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: '/userprofile/me/',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetUserDetailsQuery } = authApi
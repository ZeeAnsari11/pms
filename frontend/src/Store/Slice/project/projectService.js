import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectApi = createApi({
  reducerPath: 'projectApi',
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
        url: '/projects/',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetProjectsDetailsQuery } = projectApi
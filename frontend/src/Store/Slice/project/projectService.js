import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {REACT_APP_HOST} from "../../../Utils/envConstants";

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_HOST}`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.access
      if (accessToken) {
        headers.set('Authorization', `JWT ${accessToken}`)
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getProjectsDetails: builder.query({
      query: () => ({
        url: '/projects/',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetProjectsDetailsQuery } = projectApi
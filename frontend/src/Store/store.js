import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slice/auth/authSlice'
import projectReducer from './Slice/project/projectSlice'

import { authApi } from './Slice/auth/authService'
import { projectApi } from './Slice/project/projectService'



const store = configureStore({
  reducer: {
    auth: authReducer,
    projects:projectReducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, projectApi.middleware),
})
export default store
import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slice/auth/authSlice'
import projectReducer from './Slice/project/projectSlice'

import { authApi } from './Slice/auth/authService'



const store = configureStore({
  reducer: {
    auth: authReducer,
    projects:projectReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})
export default store
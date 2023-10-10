import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slice/auth/authSlice'
import projectReducer from './Slice/project/projectSlice'
import issueReducer from './Slice/issue/issueSlice'
import commentReducer from './Slice/comment/commentSlice'
import worklogReducer from './Slice/worklog/worklogSlice'
import {authApi} from './Slice/auth/authService'
import {projectApi} from "./Slice/project/projectService";

const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
        issue: issueReducer,
        comment: commentReducer,
        worklog: worklogReducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,projectApi.middleware),
})
export default store
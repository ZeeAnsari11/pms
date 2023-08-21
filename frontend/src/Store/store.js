import {configureStore} from '@reduxjs/toolkit'
import loginSlice from "./Slice/User/loginSlice"
import signupSlice from "./Slice/User/signupSlice"
import DataSyncerSlice from "./Slice/DataSyncerSlice"
import IssueSlice from "./Slice/Issue/IssueSlice"
import googleSlice from './Slice/User/googleauthSlice'

export const store = configureStore({
    reducer: {
        login: loginSlice,
        signUp: signupSlice,
        DataSyncer: DataSyncerSlice,
        issueData: IssueSlice,
        googleAuth: googleSlice,
    },
})
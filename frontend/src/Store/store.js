import {configureStore} from '@reduxjs/toolkit'
import loginSlice from "./Slice/User/loginSlice"
import signupSlice from "./Slice/User/signupSlice"
import DataSyncerSlice from "./Slice/DataSyncerSlice"
import IssueSlice from "./Slice/Issue/IssueSlice"

export const store = configureStore({
    reducer: {
        login: loginSlice,
        signUp: signupSlice,
        DataSyncer: DataSyncerSlice,
        issueData: IssueSlice
    },
})
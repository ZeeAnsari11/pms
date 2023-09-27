import {createSlice} from '@reduxjs/toolkit'
import {deleteWorkLog, updateWorkLog} from "./worklogActions";


const WorklogSlice = createSlice({
    name: 'worklog',
    initialState: {
        loading: false,
        currentWorklogData: {},
        error: null,
    },
    reducers: {
        setWorklogSliceInfo: (state, {payload}) => {
            state.worklogData = payload
        },
    },
    extraReducers: {
        // Update WorkLog
        [updateWorkLog.pending]: (state) => {
            state.loading = true
        },
        [updateWorkLog.fulfilled]: (state, {payload}) => {
            state.currentWorklogData = payload.data
            state.loading = false
        },
        [updateWorkLog.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

        // Delete WorkLog
        [deleteWorkLog.pending]: (state) => {
            state.loading = true
        },
        [deleteWorkLog.fulfilled]: (state, {payload}) => {
            state.currentWorklogData = payload.data
            state.loading = false
        },
        [deleteWorkLog.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

    },
})

export const {setWorklogSliceInfo} = WorklogSlice.actions

export default WorklogSlice.reducer

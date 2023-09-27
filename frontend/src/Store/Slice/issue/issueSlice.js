import {createSlice} from '@reduxjs/toolkit'
import {createIssue, deleteIssue, loadProjectIssues, updateIssue} from "./issueActions";


const IssueSlice = createSlice({
    name: 'issue',
    initialState: {
        loading: false,
        allCurrentProjectIssuesData:{},
        currentIssueData: {},
        error: null,
    },
    reducers: {
        setIssuesInfo: (state, {payload}) => {
            state.issuesData = payload
        },
    },
    extraReducers: {

        // load Issues data
        [loadProjectIssues.pending]: (state) => {
            state.loading = true
        },
        [loadProjectIssues.fulfilled]: (state, {payload}) => {
            state.allCurrentProjectIssuesData = payload.data
            state.loading = false
        },
        [loadProjectIssues.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

        // Create Issue
        [createIssue.pending]: (state) => {
            state.loading = true
        },
        [createIssue.fulfilled]: (state, {payload}) => {
            state.currentIssueData = payload.data
            state.loading = false
        },
        [createIssue.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

        // Update Issue
        [updateIssue.pending]: (state) => {
            state.loading = true
        },
        [updateIssue.fulfilled]: (state, {payload}) => {
            state.currentIssueData = payload.data
            state.loading = false
        },
        [updateIssue.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

        // Delete Issue
        [deleteIssue.pending]: (state) => {
            state.loading = true
        },
        [deleteIssue.fulfilled]: (state, {payload}) => {
            state.currentIssueData = payload.data
            state.loading = false
        },
        [deleteIssue.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },


    },
})

export const {setIssuesInfo} = IssueSlice.actions

export default IssueSlice.reducer

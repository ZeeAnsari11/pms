import {createAsyncThunk} from "@reduxjs/toolkit";
import apiRequest from "../../../Utils/apiRequest";

export const fetchIssueWorkLogs = createAsyncThunk(
    'worklog/fetch_issue_work_logs',
    async ({issueId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                params: {
                    issue: issueId
                }
            }
            return await apiRequest.get(
                `/worklogs/`,
                config
            )
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else if (error.message) {
                return rejectWithValue(error.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)


export const createWorkLog = createAsyncThunk(
    'worklog/create',
    async ({formData}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.post(
                `/worklogs/`,
                formData,
                config
            )
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else if (error.message) {
                return rejectWithValue(error.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)


export const updateWorkLog = createAsyncThunk(
    'worklog/update',
    async ({formData, worklogId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.patch(
                `/worklogs/${worklogId}/`,
                formData,
                config
            )
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else if (error.message) {
                return rejectWithValue(error.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const deleteWorkLog = createAsyncThunk(
    'worklog/delete',
    async ({worklogId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            const response = await apiRequest.delete(
                `/worklogs/${worklogId}/`,
                config
            );
            return response;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else if (error.message) {
                return rejectWithValue(error.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

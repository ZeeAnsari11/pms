import {createAsyncThunk} from "@reduxjs/toolkit";
import apiRequest from "../../../Utils/apiRequest";

export const fetchIssueComments = createAsyncThunk(
    'comment/fetch_issue_comments',
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
                `/comments/`,
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

export const createComment = createAsyncThunk(
    'comment/create',
    async ({formData}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.post(
                `/comments/`,
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


export const updateComment = createAsyncThunk(
    'comment/update',
    async ({formData, commentId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.patch(
                `/comments/${commentId}/`,
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


export const deleteComment = createAsyncThunk(
    'comment/delete',
    async ({commentId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            const response = await apiRequest.delete(
                `/comments/${commentId}/`,
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
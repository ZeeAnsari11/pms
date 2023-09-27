import {createAsyncThunk} from "@reduxjs/toolkit";
import apiRequest from "../../../Utils/apiRequest";

export const loadProjectIssues = createAsyncThunk(
    'issue/load_project_issues',
    async ({projectId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.get(
                `/projects/${projectId}/issues/`,
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

export const getIssue = createAsyncThunk(
    'issue/get_issue',
    async ({issueId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            const response = await apiRequest.get(
                `/issues/${issueId}/`,
                config
            )
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.error)
            } else if (error.message) {
                return rejectWithValue(error.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const createIssue = createAsyncThunk(
    'issue/create',
    async ({formData}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.post(
                `/issues/`,
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

export const updateIssue = createAsyncThunk(
    'issue/update',
    async ({formData, issueId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.patch(
                `/issues/${issueId}/`,
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


export const deleteIssue = createAsyncThunk(
    'issue/delete',
    async ({projectId, issueId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            const response = await apiRequest.delete(
                `/projects/${projectId}/issues/${issueId}/`,
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


export const fetchSelectedProjectTypes = createAsyncThunk(
    'issue/fetch_selected_project_types',
    async ({selectedProject}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                params: {
                    project: selectedProject
                }
            }
            return await apiRequest.get(
                `/project_type/`,
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


export const fetchSelectedProjectStatuses = createAsyncThunk(
    'issue/fetch_selected_project_statuses',
    async ({selectedProject}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                params: {
                    project: selectedProject
                }
            }
            return await apiRequest.get(
                `/project_status/`,
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


export const fetchSelectedProjectLabels = createAsyncThunk(
    'issue/fetch_selected_project_labels',
    async ({selectedProject}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                params: {
                    project: selectedProject
                }
            }
            return await apiRequest.get(
                `/project_labels/`,
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


export const fetchSelectedProjectAssignees = createAsyncThunk(
    'issue/fetch_selected_project_assignees',
    async ({selectedProject}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.get(
                `/projects/${selectedProject}/assignees/`,
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

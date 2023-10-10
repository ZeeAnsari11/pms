import {createAsyncThunk} from '@reduxjs/toolkit'
import apiRequest from '../../../Utils/apiRequest'
import {StatusCodes} from "http-status-codes";


export const loadProjects = createAsyncThunk(
    'project/load',
    async (_, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.get(
                `/projects/`,
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


export const createProject = createAsyncThunk(
    'project/create',
    async ({formData}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            const response = await apiRequest.post(
                `/projects/`,
                formData,
                config
            )
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


export const getProject = createAsyncThunk(
    'project/get_project',
    async ({projectId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            const response = await apiRequest.get(
                `/projects/${projectId}/`,
                config
            )
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


export const updateProject = createAsyncThunk(
    'project/update_project',
    async ({projectId, formData}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            const response = await apiRequest.patch(
                `/projects/${projectId}/`,
                formData,
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

export const deleteProject = createAsyncThunk(
    'project/delete',
    async ({projectId}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            const response = await apiRequest.delete(
                `/projects/${projectId}/`,
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

export const verifyUniqueKey = createAsyncThunk(
    'project/validate_unique_key',
    async ({text}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                params: {
                    slug_name: text
                }
            }
            return await apiRequest.get(
                `/validate_slug/`,
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


export const generateUniqueSlug = createAsyncThunk(
    'project/generate_unique_slug',
    async ({text}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            }
            return await apiRequest.post(
                `/validate_slug/`,
                {project_name: text},
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




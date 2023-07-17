// authSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiRequest from '../../../Utils/apiRequest';

// Initial state
const initialState = {
    isAuthenticated: false,
    loading: false, // Add loading state to initial state
    error: null,
    authToken: null,
};

// Async thunk for login
export const login = createAsyncThunk(
    'login',
    async ({username, password}, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setLoading(true)); // Set loading to true before making the API request

            const response = await apiRequest.post(`/api/auth/token/login/`, {
                username,
                password,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        } finally {
            dispatch(setLoading(false)); // Set loading to false after the API request completes
        }
    }
);

// Slice configuration
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.error = null;
            state.authToken = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.error = null;
                state.authToken = action.payload.auth_token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.error = action.payload;
                state.authToken = null;
            });
    },
});

// Actions
export const {logout, setLoading} = loginSlice.actions;

// Reducer
export default loginSlice.reducer;

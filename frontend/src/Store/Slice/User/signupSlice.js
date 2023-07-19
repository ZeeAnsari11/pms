import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiRequest from '../../../Utils/apiRequest';
import { setLoading } from "./loginSlice";

export const signUp = createAsyncThunk(
    'signup',
    async ({name, email, password}, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setLoading(true));
            return await apiRequest.post( '/api/auth/users/', {
                email,
                username : name,
                password,
            } );
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(setLoading(false))
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    successMessage: null,
};

const signupSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default signupSlice.reducer;

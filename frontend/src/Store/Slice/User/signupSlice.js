import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiRequest from '../../../Utils/apiRequest';

export const signUp = createAsyncThunk(
    'signup',
    async ({name, email, password}, {rejectWithValue}) => {
        try {
            const response = await apiRequest.post('/api/auth/users/', {
                email,
                username: name,
                password,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
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
                state.successMessage = 'Thanks for registration! Check your email and click the link to activate your account. If you need help, contact us. We appreciate your business!';
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default signupSlice.reducer;

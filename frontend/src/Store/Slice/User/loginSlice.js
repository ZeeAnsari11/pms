import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiRequest from '../../../Utils/apiRequest';

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    authToken: null,
};

export const login = createAsyncThunk(
    'login',
    async ({email, password}, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setLoading(true));
            const loginResponse = await apiRequest.post(`/api/auth/token/login/`, {
                email, password,
            });
            const authToken = loginResponse.data;
            localStorage.setItem('auth_token', authToken.auth_token);
            return {authToken};
        } catch (error) {
            return rejectWithValue(error)
        } finally {
            dispatch(setLoading(false))
        }
    }
);


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
                state.authToken = action.payload.authToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.error = action.payload;
                state.authToken = null;
            });
    },
});


export const {logout, setLoading} = loginSlice.actions;

export default loginSlice.reducer;

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiRequest from '../../../Utils/apiRequest';
import axios from 'axios';
import {DataSyncer} from "../DataSyncerSlice";

export const googleAuthenticate = createAsyncThunk(
    'google/authenticate',
    async ({state, code}, {dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const details = {
            'state': state,
            'code': code,
        };

        const formBody = Object.keys(details)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
            .join('&');

        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${process.env.REACT_APP_HOST}/auth/o/google-oauth2/?${formBody}`, config);
            dispatch(DataSyncer());

            return res.data;
        } catch (err) {
            throw err;
        }
    }
);


const initialState = {
    loading: false,
    error: null,
    successMessage: null,
};

const googleSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(googleAuthenticate.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(googleAuthenticate.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = null;
            })
            .addCase(googleAuthenticate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default googleSlice.reducer;

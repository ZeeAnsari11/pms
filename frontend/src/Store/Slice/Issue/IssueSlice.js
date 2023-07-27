import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import apiRequest from '../../../Utils/apiRequest';
import {useParams} from "react-router-dom";

const initialState = {
    loading: false,
    error: null,
    issueData: null,
};

export const fetchIssueData = createAsyncThunk(
    'fetchIssueData',
    async (issueId) => {
        let authToken = localStorage.getItem('auth_token')
        const issueDataResponse = await apiRequest.get(`/api/issues/${issueId}`, {
            headers: {'Authorization': `Token ${authToken}`},
        });
        const issueData = issueDataResponse.data;
        return {issueData};
    }
);


const fetchIssueDataSlice = createSlice({
    name: 'fetchIssueData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIssueData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIssueData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.issueData = action.payload?.issueData;
            })
            .addCase(fetchIssueData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },

});

export default fetchIssueDataSlice.reducer;

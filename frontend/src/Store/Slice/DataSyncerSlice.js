import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import apiRequest from '../../Utils/apiRequest';

const initialState = {
    loading: false,
    error: null,
    userProfileData: null,
    projectsData: null,
};

export const DataSyncer = createAsyncThunk(
    'DataSyncer',
    async () => {
        let authToken = localStorage.getItem('auth_token')
        const userDataResponse = await apiRequest.get('/api/userprofile/me/', {
            headers: {'Authorization': `Token ${authToken}`},
        });
        const userData = userDataResponse.data;
        const ProjectsDataResponse = await apiRequest.get('/api/projects/', {
            headers: {'Authorization': `Token ${authToken}`},
        });
        const projectsData = ProjectsDataResponse.data;
        return {userData, projectsData};
    }
);


const DataSyncerSlice = createSlice({
    name: 'AsyncDataSyncer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DataSyncer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DataSyncer.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.userProfileData = action.payload?.userData;
                state.projectsData = action.payload.projectsData;
            })
            .addCase(DataSyncer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },

});


export default DataSyncerSlice.reducer;

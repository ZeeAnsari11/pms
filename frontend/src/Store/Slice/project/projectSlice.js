import {createSlice} from '@reduxjs/toolkit'
import {loadProjects,createProject} from './projectActions'



const ProjectSlice = createSlice({
    name: 'project',
    initialState: {
        loading: false,
        projectsData: {},
        error: null,
    },
    reducers: {
        setProjectsInfo: (state, {payload}) => {
            state.projectsData = payload
        },
    },
    extraReducers: {
        // load Projects data
        [loadProjects.pending]: (state) => {
            state.loading = true
        },
        [loadProjects.fulfilled]: (state, {payload}) => {
            state.projectsData = payload.data
            state.loading = false
        },
        [loadProjects.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

        // // Create Project
        // [createProject.pending]: (state) => {
        //     state.loading = true
        // },
        // [createProject.fulfilled]: (state, {payload}) => {
        //     state.projectsInfo = payload.data
        //     state.loading = false
        // },
        // [createProject.rejected]: (state, {payload}) => {
        //     state.loading = false
        //     state.error = payload
        // },


    },
})

export const {setProjectsInfo} = ProjectSlice.actions

export default ProjectSlice.reducer

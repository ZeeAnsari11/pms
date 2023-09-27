import {createSlice} from '@reduxjs/toolkit'
import {loadProjects, createProject, updateProject, deleteProject} from './projectActions'


const ProjectSlice = createSlice({
    name: 'project',
    initialState: {
        loading: false,
        allProjectsData: {},
        projectInfo: {},
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
            state.allProjectsData = payload.data
            state.loading = false
        },
        [loadProjects.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

        // Create Project
        [createProject.pending]: (state) => {
            state.loading = true
        },
        [createProject.fulfilled]: (state, {payload}) => {
            state.projectInfo = payload.data
            state.loading = false
        },
        [createProject.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

        // Update Project
        [updateProject.pending]: (state) => {
            state.loading = true
        },
        [updateProject.fulfilled]: (state, {payload}) => {
            state.projectInfo = payload.data
            state.loading = false
        },
        [updateProject.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

        // Delete Project
        [deleteProject.pending]: (state) => {
            state.loading = true
        },
        [deleteProject.fulfilled]: (state, {payload}) => {
            state.projectInfo = payload.data
            state.loading = false
        },
        [deleteProject.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

    },
})

export const {setProjectsInfo} = ProjectSlice.actions

export default ProjectSlice.reducer

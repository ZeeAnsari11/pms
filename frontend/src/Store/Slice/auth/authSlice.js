import { createSlice } from '@reduxjs/toolkit'
import { loadUser, updateUser, registerUser, userLogin, googleAuthenticate } from './authActions'

const access = localStorage.getItem('access')
  ? localStorage.getItem('access')
  : null
const refresh = localStorage.getItem('refresh')
  ? localStorage.getItem('refresh')
  : null


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access,
    refresh,
    isAuthenticated: false,
    isVerified:false,
    loading: false,
    userInfo: {},
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.access = null
      state.refresh = null
      state.isAuthenticated = false
      state.isVerified = false
      state.loading = false
      state.userInfo = {}
      state.error = null
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: {
    // load user data
    [loadUser.pending]: (state) => {
      state.loading = true
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data
      state.loading = false
    },
    [loadUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    // update user data
    [updateUser.pending]: (state) => {
      state.loading = true
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data
      state.loading = false
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },


    // login user
    [userLogin.pending]: (state, {payload}) => {
      state.loading = true
    },
    [userLogin.fulfilled]: (state, {payload}) => {
      localStorage.setItem('access', payload.data.access)
      localStorage.setItem('refresh', payload.data.refresh)

      state.access = payload.data.access
      state.refresh = payload.data.refresh
      state.isAuthenticated = true
      state.isVerified = true
      state.loading = false
    },
    [userLogin.rejected]: (state, {payload} ) => {
      state.loading = false
      state.error = payload
    },

    // authenticate with Google
    [googleAuthenticate.pending]: (state, {payload}) => {
      state.loading = true
    },
    [googleAuthenticate.fulfilled]: (state, {payload}) => {
      localStorage.setItem('access', payload.data.access)
      localStorage.setItem('refresh', payload.data.refresh)

      state.access = payload.data.access
      state.refresh = payload.data.refresh
      state.isAuthenticated = true
      state.isVerified = true
      state.loading = false
    },
    [googleAuthenticate.rejected]: (state, {payload} ) => {
      state.loading = false
      state.error = payload
    },

    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isVerified = false
      state.isAuthenticated = false
      state.loading = false
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { logout, setUserInfo } = authSlice.actions

export default authSlice.reducer

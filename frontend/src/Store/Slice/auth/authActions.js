import {createAsyncThunk} from '@reduxjs/toolkit'
import apiRequest from '../../../Utils/apiRequest'


export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      return  await apiRequest.post(
          `/auth/users/`,
          { username, email, password },
          config
      )
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        } else {
            return rejectWithValue(error.message)
        }
    }
  }
)

export const googleAuthenticate = createAsyncThunk(
  'auth/google',
  async ({state, code}, { rejectWithValue }) => {
      if (state && code && !localStorage.getItem("access") && !localStorage.getItem("refresh")) {
          try {
              const config = {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                  },
              }
              const details = { code, state };
              const formBody = Object.keys(details)
                  .map(
                      (key) =>
                          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
                  )
                  .join("&");
              return await apiRequest.post(
                  `/auth/o/google-oauth2/?${formBody}`,
                  {},
                  config
              );
            } catch (error) {
              if (error.response && error.response.data.non_field_errors) {
                  return rejectWithValue(error.response.data.non_field_errors)
              } else {
                  return rejectWithValue(error.message)
              }
          }
      }
  }
)




export const loadUser = createAsyncThunk(
  'auth/load_user',
  async (_, { rejectWithValue }) => {
    try {
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
          },
      }
      return await apiRequest.get(
          `/userprofile/me/`,
          config
      )
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
  }
)


export const updateUser = createAsyncThunk(
  'auth/update_user',
  async ({userId, formData}, { rejectWithValue }) => {
    try {
      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `JWT ${localStorage.getItem('access')}`
          },
      }
      const response =  await apiRequest.patch(
          `/userprofile/${userId}/`,
          formData,
          config
      );
      return response;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
  }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            return await apiRequest.post(
                `/auth/jwt/create/`,
                {username, password},
                config
            )
        } catch (error) {
            if (error.response && error.response.data.detail) {
                return rejectWithValue(error.response.data.detail)
            } else {
                return rejectWithValue(error.message)
            }
        }
  }
)


export const verifyToken = createAsyncThunk(
    'auth/verify',
    async ({ token }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            return await apiRequest.post(
                `/auth/jwt/verify/`,
                {token},
                config
            )
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
  }
)


export const refreshToken = createAsyncThunk(
    'auth/refresh',
    async ({ refresh }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            return await apiRequest.post(
                `/auth/jwt/refresh/`,
                {refresh},
                config
            )
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
  }
)
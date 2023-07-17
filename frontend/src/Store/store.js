import {configureStore} from '@reduxjs/toolkit'
import loginSlice from "./Slice/User/loginSlice"
import signupSlice from "./Slice/User/signupSlice"

export const store = configureStore({
    reducer: {
        login: loginSlice,
        signUp: signupSlice
    },
})
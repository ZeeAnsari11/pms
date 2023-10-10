import {createSlice} from '@reduxjs/toolkit'



const CommentSlice = createSlice({
    name: 'comment',
    initialState: {
        loading: false,
        commentData: {},
        error: null,
    },
    reducers: {
        setCommentInfo: (state, {payload}) => {
            state.commentData = payload
        },
    },
    extraReducers: {


    },
})

export const {setCommentInfo} = CommentSlice.actions

export default CommentSlice.reducer

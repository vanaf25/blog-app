import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { PostInterFaceNode,Comment} from "../components/componentsTypes";
import {getComments, getPosts} from "../services";
const initialState={
    posts:[] as Array<PostInterFaceNode>,
    isLoading:false,
    comments:[] as Array<Comment>,
    isCommentsLoading:false,
}
export const fetchPosts=createAsyncThunk('data/fetchPosts',getPosts)
export const fetchComments=createAsyncThunk('data/fetchComments',getComments)
 const dataSlice=createSlice({
    name:"data",
    initialState,
    reducers:{
        setComment:(state,action:PayloadAction<Comment>)=>{
            state.comments=[...state.comments,action.payload]
        }
    },
    extraReducers:(builder )=>{
        builder.addCase(fetchPosts.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.posts=action.payload
            state.isLoading=false
        });

        builder.addCase(fetchComments.pending,state=>{
            state.isCommentsLoading=true;
        });
        builder.addCase(fetchComments.fulfilled,(state,action:PayloadAction<Array<Comment>>)=>{
            state.comments=action.payload;
            state.isCommentsLoading=false;
        })
    }
})
export const {setComment}=dataSlice.actions
export default dataSlice.reducer


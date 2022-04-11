import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category, PostWidget} from "../components/componentsTypes";
import {getCategories, getRecentPosts, getRelatedPosts} from "../services";
const initialState={
    categories: [] as Array<Category>,
    isCategoriesFetching:false,
    widgetPosts:[] as Array<PostWidget>,
    isWidgetPostsLoading:false,
    currentPostCategory:[] as Array<Category>
}
export const fetchCategories=createAsyncThunk("widget/fetchCategories",getCategories)
export const fetchWidgetPosts=createAsyncThunk('widget/recentPosts',getRecentPosts)
export const fetchRelatedPosts=createAsyncThunk("widget/relatedPosts",getRelatedPosts)
 const widgetSlice=createSlice({
   name:"widget",
    initialState,
    reducers:{
        setCurrentPostCategories:(state,action:PayloadAction<Array<Category>>)=>{
            console.log(action.payload)
            state.currentPostCategory=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            state.categories=action.payload
            state.isCategoriesFetching=false
        });
        builder.addCase(fetchCategories.pending,state=>{
            state.isCategoriesFetching=true
        });
        builder.addCase(fetchWidgetPosts.pending,state =>{
            state.isWidgetPostsLoading=true
        });
        builder.addCase(fetchWidgetPosts.fulfilled,(state,action:PayloadAction<Array<PostWidget>>)=>{
            state.widgetPosts=action.payload;
            state.isWidgetPostsLoading=false
        })
        builder.addCase(fetchRelatedPosts.pending,state=>{
            state.isWidgetPostsLoading=true
        })
        builder.addCase(fetchRelatedPosts.fulfilled,(state,
                                                     action:PayloadAction<Array<PostWidget>>)=>{
            console.log(action.payload);
            state.widgetPosts=action.payload;
            state.isWidgetPostsLoading=false
        })
    }
})
export const {setCurrentPostCategories}=widgetSlice.actions
export default widgetSlice.reducer

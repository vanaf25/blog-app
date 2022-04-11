import React, {useEffect} from 'react';
import {getPostDetails, getPosts} from "../../services";
import {NextPage} from "next";
import {PostDetails, PostInterface, PostInterFaceNode} from "../../components/componentsTypes";
import AuthorDetails from "../../components/AuthorDetails/AuthorDetails";
import {PostDetailsComponent} from "../../components/PostDetails/PostDetails";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import Comments from "../../components/Comments/Comments";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../store/store";
import { setCurrentPostCategories } from '../../store/widgetReducer';
const PostDetailsPage:NextPage<{post:PostInterface & PostDetails}> = ({post}) => {
    const slug=useRouter().query?.slug;
    const dispatch=useAppDispatch();
    console.log(post);
    useEffect(()=>{
        dispatch(setCurrentPostCategories(post.categories));
    },[slug]);
    return (
        <>
            <PostDetailsComponent post={post}/>
            <AuthorDetails logoUrl={post?.author?.photo?.url}
                           name={post?.author?.name} bio={post?.author?.bio}/>
             <CommentsForm postId={slug}/>
             <Comments id={slug}/>
        </>
    );
};
export default PostDetailsPage;
export async function getStaticProps({params}:{params:{
    slug:string
    }}){
    const data=await getPostDetails(params.slug);
    return {
        props:{
            post:data
        }
    }
}
export async function getStaticPaths() {
    const posts=await getPosts();
return {
    paths:posts.map(({node:{id}}:PostInterFaceNode)=>({params:{slug:id}})),
    fallback:false
}
}

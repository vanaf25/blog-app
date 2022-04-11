import React from 'react';
import {getPosts, getPostsByAuthor} from "../../services";
import {PostInterface, PostInterFaceNode} from "../../components/componentsTypes";
import {NextPage} from "next";
import Post from "../../components/Post/Post";
import AuthorDetails from "../../components/AuthorDetails/AuthorDetails";
const AuthorPage:NextPage<{posts:Array<PostInterface>}> = ({posts}) => {
    return (
        <div>
            {posts.length && <AuthorDetails
                logoUrl={posts[0].author.photo.url}
                name={posts[0].author.name}
                bio={posts[0].author.bio}/>}
            {posts.map(post=>{
                return <Post post={post}/>
            })}
        </div>
    );
};

export default AuthorPage;
export async function getStaticProps({params}:{params:{
        author:string
    }}){
    const data=await getPostsByAuthor(params.author);
    return {
        props:{
            posts:data
        }
    }
}
export async function getStaticPaths() {
    const posts=await getPosts();
    return {
        paths:posts.map(({node:{author}}:PostInterFaceNode)=>({params:{author:author.id}})),
        fallback:false
    }
}

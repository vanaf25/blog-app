import React from 'react';
import {useRouter} from "next/router";
import {getCategories, getPostsByCategory} from "../../services";
import {Category, PostInterface, PostInterFaceNode} from "../../components/componentsTypes";
import {NextPage} from "next";
import Post from "../../components/Post/Post";

export const CategoryComponent:NextPage<{posts:Array<PostInterface>}> = ({posts}) => {
    const router=useRouter();
    console.log(posts,router.query.category);
    return (
        <div>
            {posts.map(post=>{
                return <Post  post={post} />
            })}
        </div>
    );
};
export async function getStaticProps({params}:{params:{
        category:string
    }}){
    const data=await getPostsByCategory([params.category])
    console.log(data);
    return {
        props:{
            posts:data
        }
    }
}

export async function getStaticPaths() {
    const categories=await getCategories();
    return {
        paths:categories.map((category:Category)=>{
            return {
                params:{
                    category:category.name
                }
            }
        }),
        fallback:false
    }
}
export default CategoryComponent;

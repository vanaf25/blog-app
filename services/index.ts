import {request,gql} from "graphql-request";
import {PostInterface} from "../components/componentsTypes";
import {getRequestStatusFlags} from "@reduxjs/toolkit/dist/query/core/apiState";
const graphqlAPI=process.env.NEXT_PUBLIC_GRAPHQL_CMS_ENDPOINT
export const getPosts=async ()=>{
    const query=gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        id
                        createdAt
                        title
                        excert
                        image {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `
    // @ts-ignore
    const results=await request(graphqlAPI,query);
    return results.postsConnection.edges;
}
export const getCategories=async ()=>{
    const query= gql`
        query myQuery{
                        categories {
                            id
                            name
                            slug
                        }
                    }
    `
    // @ts-ignore
    const results=await request(graphqlAPI,query)
    return  results.categories
}
export const getRecentPosts=async ()=>{
    const query=gql`
        query GetPostDetails() {
            posts(
                orderBy:createdAt_ASC,
                last:3
            ){
                title,
                id,
                image{
                    url
                },
                createdAt
            }
        }
    `
    //@ts-ignore
    const results=await request(graphqlAPI,query)
    return  results.posts
}
export const getPostDetails=async (id:string):Promise<PostInterface & {content:{raw:string}} >=>{
    const query=gql`
        query GetPostDetails($id:ID!){
        post(where:{id:$id}){
            author {
                bio
                name
                id
                photo {
                    url
                }
            }
            id
            createdAt
            title
            excert
            image {
                url
            }
            categories {
                id
                name
                slug
            }
            content {
                raw
            }
        }
            
        }
    `
    // @ts-ignore
    const results=await request(graphqlAPI,query,{id});
    return results.post
}
export const getPostsByCategory=async (categoryName:string[])=>{
    const query=gql`
        query Posts($category:[String!]){
        posts(where:{categories_some:{name_in:$category}}){
            author {
                bio
                name
                id
                photo {
                    url
                }
            }
            id
            createdAt
            title
            excert
            image {
                url
            }
            categories {
                name
                slug
            }

        }
        }
    `
    //@ts-ignore
    const results= await  request(graphqlAPI,query,{category:categoryName})
    return  results.posts
}
export const getPostsByAuthor=async (authorId:string)=>{
    const query=gql`
        query PostsQuery($authorId:ID!){
            posts(where:{author:{id:$authorId}}){
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                id
                createdAt
                title
                excert
                image {
                    url
                }
                categories {
                    name
                    slug
                }
            }
        }
    `
    //@ts-ignore
    const results=await request(graphqlAPI,query,{authorId});
    return results.posts
}
export const submitComment=async (obj:any)=>{
const result=await fetch("/api/comments",{
    method:'POST',
    headers:{
        "Content-Type":'application/json'
    },
    body:JSON.stringify(obj),
});
return  result.json()
}
export const getComments= async (id:string)=>{
const query=gql`
    query GetComments($id:ID!){
        comments(where:{post:{id:$id}}){
            id
            name
            createdAt
            text
        }
    }
`
    //@ts-ignore
  const result=await request(graphqlAPI,query,{id});
    return result.comments
}
export const getRelatedPosts=async ({id,categories}:{id:string,categories:string[]})=>{
    console.log('categories',categories);
    const query=gql`
        query Posts($categories:[String!],$id:ID!){
            posts(where:{id_not:$id AND:{categories_some:{name_in:$categories}}},last:3){
                image{
                    url
                }
              title
                createdAt
                id
                
            }
        }
    `
    //@ts-ignore
    const results=await request(graphqlAPI,query,{id,categories});
    return results.posts
}

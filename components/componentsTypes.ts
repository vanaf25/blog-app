export interface PostInterface {
    id:string,
        title:string,
        excert:string,
        content:string,
        featuredPost:boolean,
        image:{
            url:string
        }
        createdAt:string,
        author:Author,
    category:Category
}
export interface PostInterFaceNode {
    node:PostInterface
}
export interface PostDetails {
    categories:Array<Category>,
    content:{raw:any}
}
export interface PostWidget {
    id:string,
    title:string,
    image:{
        url:string
    },
    createdAt:string,
}
export interface Author {
    id:string
    name:string,
    photo:{
        url:string
    },
    bio:string,
}

export interface Category {
    id:number,
    name:string,
    slug:string,
}
export interface Comment {
    id:string,
    name:string,
    text:string,
    email:string,
    createdAt:string,
}


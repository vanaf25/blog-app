import React, {useEffect} from 'react';
import {Card} from "antd";
import { Typography } from 'antd';
import {Flex} from "../../utils/utils";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useRouter} from "next/router";
import {fetchRelatedPosts, fetchWidgetPosts} from "../../store/widgetReducer";
import Link from "next/link";
const {Title}=Typography;
const RecentPosts:React.FC = () => {
    const dispatch=useAppDispatch();
    const router=useRouter().query?.slug;
    const widgetPosts=useAppSelector(state => state.widget.widgetPosts);
    const currentCategories=useAppSelector(state => state.widget.currentPostCategory);
    useEffect(()=>{
        if (router){
            dispatch(fetchRelatedPosts({id:router as string,categories:currentCategories.map(el=>el.name) }))
        }
        else {
            dispatch(fetchWidgetPosts());
        }
    },[currentCategories]);
    const isWidgetPostsLoading=useAppSelector(state => state.widget.isWidgetPostsLoading)
    return (
         <Card style={{width:300,backgroundColor:"#fff",padding:10,borderRadius:"5px/5px"}}>
            <Title level={4} style={{borderBottom:"2px solid #eee",paddingBottom:"10px"}}>{router ? "Related Posts":"Recent Posts"}</Title>
             {!isWidgetPostsLoading && widgetPosts.map(post=><Link  href={`/post/${post.id}`} >
                 <Flex cursor={"pointer"}  marginBottom={10}  key={post.id}>
                     <img  style={{width:50,height:50,borderRadius:"50%",marginRight:5,alignSelf:"center"}} src={post.image.url} alt={post.title}/>
                     <div>
                         <p  style={{margin:"0 0 3px 0",color:"#807e7e"}}>{new Date(post.createdAt).toLocaleDateString()}</p>
                         <p style={{margin:0}}>{post.title}</p>
                     </div>
                 </Flex>
             </Link>)}
        </Card>
    );
};
export default RecentPosts;

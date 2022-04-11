import React, {useEffect} from 'react';
import {Card} from "antd";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {fetchComments} from "../../store/dataReducer";
import {Typography} from "antd";
import moment from "moment";
const {Text}=Typography
const Comments:React.FC<{id:string | string[] | undefined}> = ({id}) => {
    const dispatch=useAppDispatch();
    const comments=useAppSelector(state => state.data.comments)
    useEffect(()=>{
        dispatch(fetchComments(id as string));
    },[id]);
    console.log(comments);
    return (
        <Card title={"Comments"} style={{width:800}}>
            {comments?.map(comment=>{
                return <div key={comment.id}>
                    <p><b>{comment.name}</b> on {moment(comment.createdAt).format("MMM DD YYYY")}</p>
                    <p>{comment.text}</p>
                </div>
            })}
        </Card>
    );
};

export default Comments;

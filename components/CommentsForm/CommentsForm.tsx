import React, {useEffect} from 'react';
import {Button, Card, Checkbox, Form, Input} from "antd";
import {Flex} from "../../utils/utils";
import {submitComment} from "../../services";
import {useAppDispatch} from "../../store/store";
import { setComment } from '../../store/dataReducer';
interface FormValues {
    remember:boolean,
    content:string,
    name:string,
    email:string
}
const CommentsForm:React.FC<{postId:string | undefined | string[]}> = ({postId}) => {
    const dispatch=useAppDispatch();
    const onFinish = ({name,remember,email,content}: FormValues) => {
        if (remember){
            localStorage.setItem("user",JSON.stringify({name,email}))
        }
        else{
            localStorage.removeItem("user");
        }
        const commentObj={
            name,
            email,
            id:postId,
            content
        }
        console.log(commentObj);
        submitComment(commentObj).then(res=>{
            dispatch(setComment({...res.createComment,name,email,text:content}))
        })
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };    return (
        <Card bordered
           style={{width:800,marginBottom:10}} title={"Leave a reply"}>
            <Form initialValues={typeof window!=="undefined" ? localStorage.getItem("user") ?
                JSON.parse(localStorage.getItem("user") as string)
            :{}:{}}  validateMessages={validateMessages} onFinish={onFinish}>
                <Form.Item name={"content"} rules={[{required:true}]} >
                    <Input.TextArea  placeholder="Content" rows={6} />
                </Form.Item>
                <Flex>
                    <Form.Item name={"name"} rules={[{required:true}]} style={{flex:"0 1 50%",marginRight:10}} >
                        <Input  placeholder="Name"/>
                    </Form.Item>
                    <Form.Item name={"email"}  rules={[{required:true,type:"email"}]}  style={{flex:"0 1 50%"}} >
                        <Input  placeholder="E-mail"/>
                    </Form.Item>
                </Flex>
                <Form.Item valuePropName={"checked"} name={"remember"}>
                    <Checkbox>Save my name, email in this browser for the next time</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button htmlType={"submit"} style={{width:250}} size={"large"} type={"primary"}>Send</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CommentsForm;

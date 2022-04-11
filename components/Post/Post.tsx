import React from 'react';
import {NextPage} from "next";
import {Button, Card, Typography} from "antd";
import styles from './Post.module.css'
import {PostInterface} from "../componentsTypes";
import { CalendarOutlined } from '@ant-design/icons';
import Link from "next/link";
const { Title } = Typography;
const Post:NextPage<{post:PostInterface,isDetails?:boolean,content?:Array<any>}> = ({post,isDetails}) => {
    return (
        <Card
            bordered
            style={{ width: 800,textAlign:"center",marginBottom:10 }}
        >
            <div className={styles.post__image}>
               <Link href={`post/${post.id}`}>
                   <img  alt={post.title} src={post.image.url} />
               </Link>
            </div>
            <Title level={2}>{post.title}</Title>
            <div className={styles.post__flex}>
                <Link href={`/author/${post.author.id}`}>
                    <div style={{cursor:"pointer"}} className={`${styles.post__flex} ${styles.post__author}`}>
                        <img alt={post.author.name}  src={post.author.photo.url}/>
                        <span>{post.author.name}</span>
                    </div>
                </Link>

                <div className={`${styles.post__flex}`}>
                    <CalendarOutlined />
                    <span>{new Date( post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <p className={styles.post__description} >
                {isDetails ? "Details Details Details Details Details Details Details Details Details":post.excert}
            </p>
            {!isDetails && <Link href={`post/${post.id}`}>
                <Button type={"primary"}>Read more</Button>
            </Link>}

        </Card>
    );
};

export default Post;

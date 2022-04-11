import React from 'react';
import styles from "../Post/Post.module.css";
import {Flex} from "../../utils/utils";
import {CalendarOutlined} from "@ant-design/icons/lib";
import moment from "moment";
interface AuthorProps {
    name:string,
    url:string,
    createdAt:string
}
const Author:React.FC<AuthorProps> = ({name,url,createdAt}) => {
    return (
        <Flex marginBottom={5}  alignItems={"center"}>
            <Flex  alignItems={"center"} className={`${styles.post__author}`}>
                <img alt={name} src={url}/>
                <span>{name}</span>
            </Flex>
            <Flex alignItems={"center"}>
                <CalendarOutlined  style={{marginRight:5}}   />
                <span>{moment(createdAt).format("MMM DD YYYY")}</span>
            </Flex>
        </Flex>
    );
};

export default Author;

import React from 'react';
import classes from './SliderElem.module.css'
import {PostInterface} from "../../componentsTypes";
const SliderElem:React.FC<{post:PostInterface}> = ({post}) => {
    return (
        <div className={classes.elem}>
            <div className={classes.elem__body}>
                <p>{new Date(post.createdAt).toLocaleDateString() }</p>
                <p className={classes.elem__title}>{post.title}</p>
                <div className={classes.elem__author}>
                    <img alt={post.author.name}   src={post.author.photo.url}/>
                    <span>{post.author.name}</span>
                </div>
            </div>
            <div className={classes.elem__cover}>
                <img src={post.image.url} alt={post.title}/>
            </div>
        </div>
    );
};

export default SliderElem;

import React, {useEffect} from 'react';
import {Card} from "antd";
import { Typography } from 'antd';
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {fetchCategories} from "../../store/widgetReducer";
const {Title}=Typography
const Categories:React.FC = () => {
    const categories=useAppSelector(state => state.widget.categories);
    const isCategoriesFetching=useAppSelector(state => state.widget.isCategoriesFetching)
    const dispatch=useAppDispatch();
    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);
    return (
        <Card  style={{width:300,backgroundColor:"#fff",padding:10,marginBottom:10,borderRadius:"5px/5px"}}>
            <Title  level={4} style={{borderBottom:"2px solid #eee",paddingBottom:"10px",margin:"15px 0 10px 0"}}>Categories</Title>
            {categories?.map(category=><div style={{padding:"10px 0",borderBottom:"2px solid #eee"}} key={category.id}>
                <Link key={category.slug} href={`/category/${category.name}`}>{category.name}</Link>
            </div>)}
        </Card>
    );
};

export default Categories;

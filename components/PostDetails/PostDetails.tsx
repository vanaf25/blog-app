import {PostInterface} from "../componentsTypes";
import React from "react";
import {Card,Typography} from "antd";
import Author from "../Author/Author";
const {Title,Text}=Typography;
export const PostDetailsComponent:React.FC<{post:PostInterface & {content:{raw:any}}}> = ({post}) => {
    console.log(post);
    const getContentFragment = (index:number, text:string, obj:
        {bold:boolean,italic:boolean,underline:boolean,
            title:string,height:number,width:number,src:string}, type?:string) => {
        let modifiedText:any = text;
        if (obj) {
            if (obj.bold) {
                modifiedText = (<b key={index}>{text}</b>);
            }

            if (obj.italic) {
                modifiedText = (<em key={index}>{text}</em>);
            }

            if (obj.underline) {
                modifiedText = (<u key={index}>{text}</u>);
            }
        }

        switch (type) {
            case 'heading-three':
                return <Title level={3} key={index}>{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</Title>;
            case 'paragraph':
                return <Text key={index}>{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</Text>;
            case 'heading-four':
                return <Title level={4} key={index} >{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</Title>;
            case 'image':
                return (
                    <img
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                    />
                );
            default:
                return modifiedText;
        }
    };
    return (
        <Card
            hoverable
            style={{borderRadius:"10px/10px",width:800,marginBottom:50}}
            cover={<img src={post.image.url} alt={post.title}/>}
        >
            <Author name={post?.author?.name} url={post?.author?.photo?.url} createdAt={post?.createdAt}/>
            <Title level={2}>{post.title}</Title>
            {post?.content?.raw?.children?.map((typeObj:any,index:number)=>{
                const children=typeObj.children.map((item:any,itemIndex:number)=>getContentFragment(itemIndex,item.text,item));
                return getContentFragment(index,children,typeObj,typeObj.type)
            })}
        </Card>
    );
};

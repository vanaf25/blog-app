import {NextPage} from "next";
interface FlexInterFace {
    justifyContent?:"flex-start" | "center" | "space-between" | "space-around" | "space-evenly" | "flex-end",
    alignItems?:"center" | "stretch" | "start" | "end",
    marginBottom?:number | string,
    cursor?:"pointer"
}
export const Flex:NextPage<JSX.IntrinsicElements["div"] & FlexInterFace>=({children,justifyContent,alignItems,marginBottom,cursor,...otherProps})=>{
    return (
        <div  {...otherProps} style={{cursor:cursor ? cursor:"auto",  display:"flex", alignItems:alignItems ? alignItems :"stretch",
            justifyContent:justifyContent ? justifyContent:"flex-start",
            marginBottom:marginBottom ? typeof marginBottom==="number" ? `${marginBottom}px`:marginBottom:0}}>
            {children}
        </div>
    )
}

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SliderElem from "./SliderElem/SliderElem";
import {PostInterFaceNode} from "../componentsTypes";
import Link from "next/link";
const Slider:React.FC<{posts:Array<PostInterFaceNode>}> = ({posts}) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={0}
            style={{marginBottom:10,width:800}}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}>
            {
                posts?.map((post,i)=><SwiperSlide key={i}><Link href={`/post/${post.node.id}`}><SliderElem post={post.node} /></Link></SwiperSlide>)
            }
        </Swiper>
    );
};

export default Slider;

import React from 'react';
import Categories from "../Categories/Categories";
import RecentPosts from "../RecentPosts/RecentPosts";
const SideBar = () => {
    return (
        <div>
            <Categories/>
            <RecentPosts/>
        </div>
    );
};

export default SideBar;

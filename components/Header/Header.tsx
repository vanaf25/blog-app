import React from 'react';
import {Menu,Layout} from "antd";
import styles from './Header.module.css';
import Link from 'next/link';
import {useAppSelector} from "../../store/store";
import {useRouter} from "next/router";
const {Header}=Layout
const HeaderComponent:React.FC = () => {
    const categories=useAppSelector(state=>state.widget.categories)
    const router=useRouter();
    console.log(router.query?.category);
    return (
        <Header className={styles.menu}>
            <div className={styles.menu__logo}>
              <Link href={'/'}>Pan Cebula</Link>
            </div>
            <Menu defaultSelectedKeys={[router.query?.category ?
                router.query.category as string :""]}  theme="dark" mode="horizontal">
                {categories.map((category, ) => {
                    return <Menu.Item  key={category.name}>
                        <Link href={`/category/${category.name}`}>{category.name}</Link>
                    </Menu.Item>;
                })}
            </Menu>
        </Header>
    );
};

export default HeaderComponent;

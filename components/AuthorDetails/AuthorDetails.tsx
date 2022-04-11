import React from 'react';
import styles from './AuthorDetails.module.css'
import {Typography} from "antd";
type AuthorDetailsProps={
    logoUrl:string,
    name:string,
    bio:string
}
const {Title,Text}=Typography
const AuthorDetails:React.FC<AuthorDetailsProps> = ({logoUrl,name,bio}) => {
    return (
        <div className={styles.author}>
            <div className={styles.author__logo}>
                <img src={logoUrl} alt={name}/>
            </div>
            <Title level={3}>{name}</Title>
            <Text style={{fontSize:18}}>
                {bio}
            </Text>
        </div>
    );
};

export default AuthorDetails;

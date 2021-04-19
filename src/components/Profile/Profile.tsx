import React from "react";
import classes from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileInfoType} from "../../redux/profile-reducer";

export type ProfilePropsType = {
    profile: null | ProfileInfoType,
    status: string,
    updateStatusThunkCreator: (status: string) => void

}

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatusThunkCreator={props.updateStatusThunkCreator}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;
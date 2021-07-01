import React from "react";
import classes from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

import {ProfileDataFormType} from "./ProfileInfo/ProfileDataForm";
import {ProfileInfoType} from "../../types/types";

export type ProfilePropsType = {
    profile: null | ProfileInfoType,
    status: string,
    updateStatusThunkCreator: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
    saveProfile: (formData: ProfileDataFormType) => Promise<any>
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}
                         updateStatusThunkCreator={props.updateStatusThunkCreator} isOwner={props.isOwner}
                         savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;
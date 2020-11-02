import React from "react";
import classes from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AddPostActionType, ProfilePageType, UpdateNewPostTextActionType} from "../../redux/store";

type ProfileType = {
    profilePage: ProfilePageType
    dispatch: (action: AddPostActionType | UpdateNewPostTextActionType) => void
}

const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.messageForNewPost}
                     dispatch={props.dispatch}/>
        </div>
    )
}

export default Profile;
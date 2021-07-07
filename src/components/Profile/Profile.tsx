import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileInfoType} from "../../types/types";

export type ProfilePropsType = {
    profile: null | ProfileInfoType,
    status: string,
    updateStatusTC: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileInfoType) => Promise<any>
}

const Profile:React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatusTC={props.updateStatusTC}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;
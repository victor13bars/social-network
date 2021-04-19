import React from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfilePropsType} from "../Profile";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = ({profile, status, updateStatusThunkCreator}: ProfilePropsType) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={profile.photos.large} alt=""/>
                <div>{profile.aboutMe}</div>
                <div>{profile.lookingForAJobDescription}</div>
                <ProfileStatusWithHooks status={status} updateStatusThunkCreator={updateStatusThunkCreator}/>
            </div>

        </div>
    )
}

export default ProfileInfo;
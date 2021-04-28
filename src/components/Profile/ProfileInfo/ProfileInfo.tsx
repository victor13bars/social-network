import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfilePropsType} from "../Profile";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";


const ProfileInfo = ({profile, status, updateStatusThunkCreator, isOwner,savePhoto}: ProfilePropsType) => {
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e:any) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt="" className={s.mainPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <div>{profile.aboutMe}</div>
                <div>{profile.lookingForAJobDescription}</div>
                <ProfileStatusWithHooks status={status} updateStatusThunkCreator={updateStatusThunkCreator}/>
            </div>

        </div>
    )
}

export default ProfileInfo;
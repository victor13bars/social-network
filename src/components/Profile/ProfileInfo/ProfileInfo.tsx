import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfilePropsType} from "../Profile";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";

import ProfileDataForm, {ProfileDataFormType} from "./ProfileDataForm";
import ProfileDataReduxForm from "./ProfileDataForm";
import {ProfileInfoType} from "../../../types/types";


const ProfileInfo = ({profile, status, updateStatusThunkCreator, isOwner, savePhoto, saveProfile}: ProfilePropsType) => {
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onsubmit = (formData: ProfileDataFormType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt="" className={s.mainPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataReduxForm profile={profile} initialValues={profile} onSubmit={onsubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>}
                <ProfileStatusWithHooks status={status} updateStatusThunkCreator={updateStatusThunkCreator}/>
            </div>

        </div>
    )
}
export type ProfileDataType = {
    profile: null | ProfileInfoType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {
    if (!profile) {
        return <Preloader/>
    } else
        return (
            <div>
                {isOwner && <div>
                    <button onClick={goToEditMode}>edit</button>
                </div>}
                <div>
                    <b>Full Name</b>: {profile.fullName}
                </div>
                <div>
                    <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
                </div>
                {profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
                }
                <div>
                    <b>About me</b>: {profile.aboutMe}
                </div>
                <div>
                    <b>Contacts</b>: {Object.entries(profile.contacts).map((value, index) => {
                    return <Contact key={index} contactTitle={value[0]} contactValue={value[1]}/>
                })}
                </div>
            </div>
        )
}

export type ContactType = {
    contactTitle: any,
    contactValue: any
}
const Contact = (props: ContactType) => {
    return (
        <div className={s.contact}>
            <b>{props.contactTitle}</b>:{props.contactValue}
        </div>)
}

export default ProfileInfo;
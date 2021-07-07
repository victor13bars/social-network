import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfilePropsType} from "../Profile";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";

import ProfileDataReduxForm from "./ProfileDataForm";
import {ContactsType, ProfileInfoType} from "../../../types/types";


const ProfileInfo:React.FC<ProfilePropsType> = ({profile, status, updateStatusTC, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onsubmit = (formData: ProfileInfoType) => {
        saveProfile(formData).then(
            () => {
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
                <ProfileStatusWithHooks status={status} updateStatusTC={updateStatusTC}/>
            </div>

        </div>
    )
}

export type ProfileDataType = {
    profile: null | ProfileInfoType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData:React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
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
                    <b>Contacts</b>: {
                    Object
                        .keys(profile.contacts)
                    .map((key) => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                    {/*<b>Contacts</b>: {Object.entries(profile.contacts).map((value, index) => {*/}
                    {/*return <Contact key={index} contactTitle={value[0]} contactValue={value[1]}/>*/}
                })}
                </div>
            </div>
        )
}

export type ContactPropsType = {
    contactTitle: string,
    contactValue: string
}
const Contact:React.FC<ContactPropsType> = (props) => {
    return (
        <div className={s.contact}>
            <b>{props.contactTitle}</b>:{props.contactValue}
        </div>)
}

export default ProfileInfo;
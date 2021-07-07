import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import styles from "../../common/FormsControls/FormsControls.module.css";
import {ProfileInfoType} from "../../../types/types";

export type ProfileType = {
    profile: null | ProfileInfoType
}

type FormDataValuesTypeKeys = Extract<keyof ProfileInfoType, string>
const ProfileDataForm: React.FC<InjectedFormProps<ProfileInfoType, ProfileType> & ProfileType> = ({handleSubmit, error, profile}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <b>Full Name</b>: {createField<FormDataValuesTypeKeys>("Full name", 'fullName', Input, [required])}
            </div>
            <div>
                <b>Looking for a
                    job</b>: {createField<FormDataValuesTypeKeys>(undefined, 'lookingForAJob', Input, [required], {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField<FormDataValuesTypeKeys>("My professional skills", 'lookingForAJobDescription', Textarea, [required])}
            </div>
            <div>
                <b>About me</b>:
                {createField<FormDataValuesTypeKeys>("About me", 'aboutMe', Textarea, [required])}
            </div>
            <div>
                <b>Contacts</b>: {profile && Object.entries(profile.contacts).map((value, index) => {
                return <div className={s.contact}>
                    <b>{value[0]}: {createField(value[0], 'contacts.' + value[0], Input, [])}</b>
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileInfoType, ProfileType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataReduxForm
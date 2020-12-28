import React from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfilePropsType} from "../Profile";


const ProfileInfo = (props:ProfilePropsType) => {
    if(!props.profile){
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img className={classes.img}
                     src="https://avatars.mds.yandex.net/get-pdb/2797954/0e70c09d-6fa7-40ac-ba85-c36b467e8de5/s1200?webp=false"
                     alt=""/>
            </div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large} alt=""/>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.lookingForAJobDescription}</div>
                Ava+description
            </div>

        </div>
    )
}

export default ProfileInfo;
import React from "react";
import classes from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img className={classes.img}
                     src="https://avatars.mds.yandex.net/get-pdb/2797954/0e70c09d-6fa7-40ac-ba85-c36b467e8de5/s1200?webp=false"
                     alt=""/>
            </div>
            <div className={classes.descriptionBlock}>
                Ava+description
            </div>

        </div>
    )
}

export default ProfileInfo;
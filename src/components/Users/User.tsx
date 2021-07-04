import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsUserType = {
    followingInProgress: Array<number>
    user: UserType,
    unfollowTC: (userId: number) => void
    followTC: (userId: number) => void
}

let User:React.FC<PropsUserType> = ({user, followingInProgress, unfollowTC, followTC}) => {

    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {

                            unfollowTC(user.id)

                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {

                            followTC(user.id)

                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                 <span>
                     <div>{"u.location.country"}</div>
                     <div>{"u.location.city"}</div>
                 </span>
            </span>
        </div>)
}

export default User;
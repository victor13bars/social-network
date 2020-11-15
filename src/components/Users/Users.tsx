import React from 'react';
import {SetUsersACType, UsersType, UserType} from "../../redux/users-reducer";
import styles from "./users.module.css"

type PropsUserType = {
    users: Array<UserType>,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    setUsers: (users: any) => void
}
let Users = (props: PropsUserType) => {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: "https://www.nastol.com.ua/download.php?img=201212/1440x900/nastol.com.ua-37486.jpg",
                followed: false,
                fullname: "I'am a boss",
                location: {city: "Zhodino", country: "Belarus"}
            },
            {
                id: 2,
                photoUrl: "https://f3.upet.com/P_LOy49X6Hub_u.jpg",
                followed: true,
                fullname: "Viktor.S",
                location: {city: "Los Angeles", country: "USA"}
            },
            {
                id: 3,
                photoUrl: "https://wallbox.ru/resize/1024x768/wallpapers/main/201522/d05a059101136c6.jpg",
                followed: false,
                fullname: "Mihel.K",
                location: {city: "Barsuki", country: "Russia"}
            },
        ])
    }
    return <div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photoUrl} className={styles.userPhoto}/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            props.unfollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            props.follow(u.id)
                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{u.fullname}</div>
                    <div>{u.fullname}</div>
                </span>
                 <span>
                     <div>{u.location.country}</div>
                     <div>{u.location.city}</div>
                 </span>
            </span>
        </div>)}
    </div>
}

export default Users;
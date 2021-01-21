import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type PropsUsType = {
    users: Array<UserType>,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
}

let Users = (props: PropsUsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage : ""}
                             onClick={(event) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}

        </div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                withCredentials: true,
                                headers: {
                                    'api-key': '8eaba7cd-8849-4eb5-b90f-f5fda0cd9786'
                                }
                            }).then(response => {
                                if (response.data.resultCode === 0) {
                                    props.unfollow(u.id)
                                }
                            });

                        }}>Unfollow</button>
                        : <button onClick={() => {
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                withCredentials: true,
                                headers: {
                                    'api-key': '8eaba7cd-8849-4eb5-b90f-f5fda0cd9786'
                                }
                            }).then(response => {
                                if (response.data.resultCode === 0) {
                                    props.follow(u.id)
                                }
                            });

                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                 <span>
                     <div>{"u.location.country"}</div>
                     <div>{"u.location.city"}</div>
                 </span>
            </span>
        </div>)}
    </div>
}
export default Users;
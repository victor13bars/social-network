import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsUsType = {
    followingInProgress: Array<number>
    users: Array<UserType>,
    followSuccess: (id: number) => void,
    unfollowSuccess: (id: number) => void,
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    portionSize:number,
    onPageChanged: (pageNumber: number) => void
    unfollowThunkCreator: (userId: number) => void
    followThunkCreator: (userId: number) => void
}

let Users = ({pageSize, totalItemsCount, currentPage,  portionSize, onPageChanged, ...props}: PropsUsType) => {

    return <div>
        <Paginator pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={portionSize} currentPage={currentPage} onPageChanged={onPageChanged}/>
        <div>
            {props.users.map(u => <User user={u}
                                        key={u.id}
                                        followingInProgress={props.followingInProgress}
                                        followThunkCreator={props.followThunkCreator}
                                        unfollowThunkCreator={props.unfollowThunkCreator}/>
            )}
        </div>
    </div>
}
export default Users;
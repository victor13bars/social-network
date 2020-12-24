import React from 'react';
import Users from "./UsersC";
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersReducersTypes
} from "../../redux/action";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {UserType} from "../../redux/users-reducer";


let mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage:state.usersPage.currentPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch<UsersReducersTypes>) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers:(users:Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage:(currentPage:number)=>{
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount:(totalCount:number)=>{
            dispatch(setTotalUsersCountAC(totalCount))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);
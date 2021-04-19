import React from 'react';
import {usersAPI} from "../api/api";
import {updateObjectInArray} from '../utils/object-helpers';

const TOGGLE_IS_FETCHING = 'USERS/TOGGLE/IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE/IS_FOLLOWING_PROGRESS';
const SET_TOTAL_COUNT = 'USERS/SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE';
const SET_USERS = 'USERS/SET_USERS';
const FOLLOW = 'USERS/FOLLOW';
const UNFOLLOW = 'USERS/UNFOLLOW';

export type UserType = {
    id: number,
    photos: {
        small: string,
        large: string
    },
    followed: boolean,
    name: string,
    location: {
        city: string,
        country: string
    },
    status: string
}
export type UsersType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}
let initialState = {
    users: [
        // {id: 1,photoUrl:"https://www.nastol.com.ua/download.php?img=201212/1440x900/nastol.com.ua-37486.jpg",followed: false, fullname: "I'am a boss", location: {city: "Zhodino", country: "Belarus"}},
        // {id: 2,photoUrl:"https://f3.upet.com/P_LOy49X6Hub_u.jpg", followed: true, fullname: "Viktor.S", location: {city: "Los Angeles", country: "USA"}},
        // {id: 3,photoUrl:"https://wallbox.ru/resize/1024x768/wallpapers/main/201522/d05a059101136c6.jpg", followed: false, fullname: "Mihel.K", location: {city: "Barsuki", country: "Russia"}},
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export const usersReducer = (state: UsersType = initialState, action: UsersReducersTypes) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: true})
                // users: state.users.map(u => {
                //     if (u.id === action.id) {
                //         return {...u, followed: true}
                //     }
                //     return u;
                // })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: false})
                // users: state.users.map(u => {
                //     if (u.id === action.id) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
            }
        case SET_USERS:
            return {...state, users: action.users}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

export type ToggleIsFetchingACType = {
    type: 'USERS/TOGGLE/IS_FETCHING',
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingACType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
})

export type ToggleIsFollowingACType = {
    type: 'USERS/TOGGLE/IS_FOLLOWING_PROGRESS',
    isFetching: boolean,
    userId: number
}

export const toggleIsFollowing = (isFetching: boolean, userId: number): ToggleIsFollowingACType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId: userId
})

export type SetTotalUsersCountACType = {
    type: 'USERS/SET_TOTAL_COUNT',
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountACType => ({
    type: SET_TOTAL_COUNT,
    totalUsersCount: totalUsersCount
})

export type SetCurrentPageACType = {
    type: 'USERS/SET_CURRENT_PAGE',
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
})

export type FollowACType = {
    type: 'USERS/FOLLOW',
    id: number
}
export const followSuccess = (userId: number): FollowACType => ({
    type: FOLLOW,
    id: userId
})

export type UnFollowACType = {
    type: 'USERS/UNFOLLOW',
    id: number
}
export const unfollowSuccess = (userId: number): UnFollowACType => ({
    type: UNFOLLOW,
    id: userId
})

export type SetUsersACType = {
    type: 'USERS/SET_USERS',
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersACType => ({
    type: SET_USERS,
    users: users
})

export const getUsersThunkCreator = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize);

    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

// const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
//     dispatch(toggleIsFollowing(true, userId));
//     let response = await apiMethod(userId);
//
//     if (response.data.resultCode === 0) {
//         dispatch(actionCreator(userId))
//     }
//     dispatch(toggleIsFollowing(false, userId))
// }


export const followThunkCreator = (userId: number) => async (dispatch: any) => {
    // let apiMethod = usersAPI.follow.bind(usersAPI);
    // let actionCreator = followSuccess;
    // followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)

    dispatch(toggleIsFollowing(true, userId))

    let response = await usersAPI.follow(userId);
    if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleIsFollowing(false, userId))
}


export const unfollowThunkCreator = (userId: number) => async (dispatch: any) => {
    // let apiMethod = usersAPI.unfollow.bind(usersAPI);
    // let actionCreator = unfollowSuccess;
    // followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)

    dispatch(toggleIsFollowing(true, userId))

    let response = await usersAPI.unfollow(userId);
    if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(toggleIsFollowing(false, userId))

}


export type UsersReducersTypes =
    FollowACType
    | UnFollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
    | ToggleIsFetchingACType
    | ToggleIsFollowingACType;

export default usersReducer;
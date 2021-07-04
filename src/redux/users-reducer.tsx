import React from 'react';
import {usersAPI} from "../api/api";
import {updateObjectInArray} from '../utils/object-helpers';
import {PhotosType, UserType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const TOGGLE_IS_FETCHING = 'USERS/TOGGLE/IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE/IS_FOLLOWING_PROGRESS';
const SET_TOTAL_COUNT = 'USERS/SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE';
const SET_USERS = 'USERS/SET_USERS';
const FOLLOW = 'USERS/FOLLOW';
const UNFOLLOW = 'USERS/UNFOLLOW';

export type UserInitialStateType = typeof  initialState;

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    portionSize:10,
    isFetching: true,
    followingInProgress: [] as Array<number>//Array of user id
}

export const usersReducer = (state= initialState, action: UsersReducersTypes):UserInitialStateType => {
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
            return {...state, totalItemsCount: action.totalItemsCount}

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
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingACType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
})

export type ToggleIsFollowingACType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toggleIsFollowing = (isFetching: boolean, userId: number): ToggleIsFollowingACType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId: userId
})

export type SetTotalUsersCountACType = {
    type: typeof SET_TOTAL_COUNT,
    totalItemsCount: number
}
export const setTotalUsersCount = (totalItemsCount: number): SetTotalUsersCountACType => ({
    type: SET_TOTAL_COUNT,
    totalItemsCount: totalItemsCount
})

export type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
})

export type FollowACType = {
    type: typeof FOLLOW,
    id: number
}
export const followSuccess = (userId: number): FollowACType => ({
    type: FOLLOW,
    id: userId
})

export type UnFollowACType = {
    type: typeof UNFOLLOW,
    id: number
}
export const unfollowSuccess = (userId: number): UnFollowACType => ({
    type: UNFOLLOW,
    id: userId
})

export type SetUsersACType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersACType => ({
    type: SET_USERS,
    users: users
})

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UsersReducersTypes>

export const getUsersTC = (page: number, pageSize: number):ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize);

    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

// const _followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
//     dispatch(toggleIsFollowing(true, userId));
//     let response = await apiMethod(userId);
//
//     if (response.data.resultCode === 0) {
//         dispatch(actionCreator(userId))
//     }
//     dispatch(toggleIsFollowing(false, userId))
// }


export const followTC = (userId: number):ThunkType => async (dispatch) => {
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


export const unfollowTC = (userId: number):ThunkType => async (dispatch: any) => {
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
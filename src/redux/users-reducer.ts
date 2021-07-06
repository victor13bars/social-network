import React from 'react';
import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";
import {usersAPI} from "../api/user-api";
import {ResultCodeEnum} from "../api/api";

export type UserInitialStateType = typeof initialState;

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    portionSize: 10,
    isFetching: true,
    followingInProgress: [] as Array<number>//Array of user id
}

export const usersReducer = (state = initialState, action: UsersReducersTypes): UserInitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
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
        case 'UNFOLLOW':
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
        case 'SET_USERS':
            return {...state, users: action.users}

        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}

        case 'SET_TOTAL_COUNT':
            return {...state, totalItemsCount: action.totalItemsCount}

        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}

        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type UsersReducersTypes = InferActionsType<typeof actions>

export const actions = {
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching: isFetching
    } as const),

    toggleIsFollowing: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching: isFetching,
        userId: userId
    } as const),

    setTotalUsersCount: (totalItemsCount: number) => ({
        type: 'SET_TOTAL_COUNT',
        totalItemsCount: totalItemsCount
    } as const),

    setCurrentPage: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE',
        currentPage: currentPage
    } as const),

    followSuccess: (userId: number) => ({
        type: 'FOLLOW',
        id: userId
    } as const),

    unfollowSuccess: (userId: number) => ({
        type: 'UNFOLLOW',
        id: userId
    } as const),

    setUsers: (users: Array<UserType>) => ({
        type: 'SET_USERS',
        users: users
    } as const)

}

type ThunkType = BaseThunkType<UsersReducersTypes>

export const getUsersTC = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize);

    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
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


export const followTC = (userId: number): ThunkType => async (dispatch) => {
    // let apiMethod = usersAPI.follow.bind(usersAPI);
    // let actionCreator = followSuccess;
    // followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)

    dispatch(actions.toggleIsFollowing(true, userId))

    let data = await usersAPI.follow(userId);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.followSuccess(userId))
    }
    dispatch(actions.toggleIsFollowing(false, userId))
}


export const unfollowTC = (userId: number): ThunkType => async (dispatch: any) => {
    // let apiMethod = usersAPI.unfollow.bind(usersAPI);
    // let actionCreator = unfollowSuccess;
    // followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)

    dispatch(actions.toggleIsFollowing(true, userId))

    let data = await usersAPI.unfollow(userId);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.unfollowSuccess(userId))
    }
    dispatch(actions.toggleIsFollowing(false, userId))

}

export default usersReducer;
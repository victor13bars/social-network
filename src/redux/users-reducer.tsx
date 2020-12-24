import React from 'react';
import {ACTIONS_TYPE, UsersReducersTypes} from "./action";

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
    currentPage: number
}
let initialState = {
    users: [
        // {id: 1,photoUrl:"https://www.nastol.com.ua/download.php?img=201212/1440x900/nastol.com.ua-37486.jpg",followed: false, fullname: "I'am a boss", location: {city: "Zhodino", country: "Belarus"}},
        // {id: 2,photoUrl:"https://f3.upet.com/P_LOy49X6Hub_u.jpg", followed: true, fullname: "Viktor.S", location: {city: "Los Angeles", country: "USA"}},
        // {id: 3,photoUrl:"https://wallbox.ru/resize/1024x768/wallpapers/main/201522/d05a059101136c6.jpg", followed: false, fullname: "Mihel.K", location: {city: "Barsuki", country: "Russia"}},
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
}

export const usersReducer = (state: UsersType = initialState, action: UsersReducersTypes) => {
    switch (action.type) {
        case ACTIONS_TYPE.FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case ACTIONS_TYPE.UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case ACTIONS_TYPE.SET_USERS:
            return {...state, users: action.users}

        case ACTIONS_TYPE.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case ACTIONS_TYPE.SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        default:
            return state;
    }
}

export default usersReducer;
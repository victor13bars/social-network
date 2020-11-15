import React from 'react';
const SET_USERS = "SET_USERS"
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";

export type FollowACType = {
    type: "FOLLOW",
    id: number
}
export type UnFollowACType = {
    type: "UNFOLLOW",
    id: number
}
export type SetUsersACType = {
    type: "SET_USERS",
    users: Array<UserType>
}
export type UserType = {
    id: number,
    photoUrl:string,
    followed: boolean,
    fullname: string,
    location: {
        city: string,
        country: string
    }
}
export type UsersType = {
    users: Array<UserType>
}
let initialState = {
    users: [
        // {id: 1,photoUrl:"https://www.nastol.com.ua/download.php?img=201212/1440x900/nastol.com.ua-37486.jpg",followed: false, fullname: "I'am a boss", location: {city: "Zhodino", country: "Belarus"}},
        // {id: 2,photoUrl:"https://f3.upet.com/P_LOy49X6Hub_u.jpg", followed: true, fullname: "Viktor.S", location: {city: "Los Angeles", country: "USA"}},
        // {id: 3,photoUrl:"https://wallbox.ru/resize/1024x768/wallpapers/main/201522/d05a059101136c6.jpg", followed: false, fullname: "Mihel.K", location: {city: "Barsuki", country: "Russia"}},
    ]
}

const usersReducer = (state: UsersType = initialState, action: FollowACType | UnFollowACType | SetUsersACType) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {...state,users:[...state.users,...action.users]}
        default:
            return state;
    }
}
export const followAC = (userId: number): FollowACType => {
    return {
        type: FOLLOW,
        id: userId
    }
}
export const unfollowAC = (userId: number): UnFollowACType => {
    return {
        type: UNFOLLOW,
        id: userId
    }
}
export const setUsersAC = (users:Array<UserType>): SetUsersACType => {
    return {
        type: SET_USERS,
        users:users
    }
}

export default usersReducer;
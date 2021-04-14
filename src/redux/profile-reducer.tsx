import React from 'react';
import {PostType} from "../components/Profile/MyPosts/MyPosts";
import {usersAPI} from "../api/api";

const ADD_POST = "PROFILE/ADD-POST";
const DELETE_POST = "PROFILE/DELETE-POST";
const SET_USER_PROFILE = "PROFILE/SET-USER-PROFILE";
const SET_STATUS = "PROFILE/SET-STATUS";

export type ContactsType = {
    facebook: string,
    website: string,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: string,
    github: string,
    mainLink: string
}
export type PhotosType = {
    small: string,
    large: string
}
export type ProfileInfoType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
}
export type ProfilePageType = {
    posts: Array<PostType>
    profile: null | ProfileInfoType
    status: string
}

let initialState = {
    posts: [
        {id: 1, message: "Hello", likeCount: 12},
        {id: 2, message: "How are you?", likeCount: 25},
    ],
    profile: null,
    status: "123"
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileReducersTypes) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {id: 5, message: action.newMyPost, likeCount: 0};
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        }
        default:
            return state;
    }
}

export type SetUserProfileACType = {
    type: "PROFILE/SET-USER-PROFILE",
    profile: ProfileInfoType
}
export const setUserProfile = (profile: ProfileInfoType): SetUserProfileACType => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    }
}

export const getUserProfileThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        usersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))
        })
    }
}

export type AddPostActionType = {
    type: "PROFILE/ADD-POST",
    newMyPost: string
}
export const addPostAC = (newMyPost: string): AddPostActionType => {
    return {
        type: ADD_POST,
        newMyPost
    }
}

export type DeletePostActionType = {
    type: "PROFILE/DELETE-POST",
    postId: number
}
export const deletePostAC = (postId: number): DeletePostActionType => {
    return {
        type: DELETE_POST,
        postId
    }
}


export type SetStatusACType = {
    type: "PROFILE/SET-STATUS",
    status: string
}
export const setStatus = (status: string): SetStatusACType => {
    return {
        type: SET_STATUS,
        status: status
    }
}

export type ProfileReducersTypes =
    AddPostActionType
    | SetUserProfileACType
    | SetStatusACType
    | DeletePostActionType;


export default profileReducer;
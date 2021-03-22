import React from 'react';
import {ACTIONS_TYPE, ProfileReducersTypes} from "./action";
import {PostType} from "../components/Profile/MyPosts/MyPosts";

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
        case ACTIONS_TYPE.ADD_POST: {
            const newPost: PostType = {id: 5, message: action.newMyPost, likeCount: 0};
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }

        case ACTIONS_TYPE.SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case ACTIONS_TYPE.SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export default profileReducer;
import React from 'react';
import {PostType} from "../components/Profile/MyPosts/MyPosts";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "PROFILE/ADD-POST";
const DELETE_POST = "PROFILE/DELETE-POST";
const SET_USER_PROFILE = "PROFILE/SET-USER-PROFILE";
const SET_STATUS = "PROFILE/SET-STATUS";
const SAVE_PHOTO = "PROFILE/SAVE-PHOTO";


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

const profileReducer = (state: ProfilePageType = initialState, action: ProfileReducersTypes):ProfilePageType  => {
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
        case SAVE_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileInfoType
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
export const setUserProfile = (profile: ProfileInfoType): SetUserProfileACType => ({
    type: SET_USER_PROFILE,
    profile: profile
})

export type AddPostActionType = {
    type: "PROFILE/ADD-POST",
    newMyPost: string
}
export const addPostAC = (newMyPost: string): AddPostActionType => ({
    type: ADD_POST,
    newMyPost
})

export type DeletePostActionType = {
    type: "PROFILE/DELETE-POST",
    postId: number
}
export const deletePostAC = (postId: number): DeletePostActionType => ({
    type: DELETE_POST,
    postId
})


export type SetStatusACType = {
    type: "PROFILE/SET-STATUS",
    status: string
}
export const setStatus = (status: string): SetStatusACType => ({
    type: SET_STATUS,
    status: status
})

export type SetPhotoSuccessACType = {
    type: "PROFILE/SAVE-PHOTO",
    photos: PhotosType
}
export const setPhotoSuccess = (photos: PhotosType): SetPhotoSuccessACType => ({
    type: SAVE_PHOTO,
    photos
})

export const getUserProfileThunkCreator = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data))
}

export const getStatusThunkCreator = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}

export const updateStatusThunkCreator = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos))
    }
}

export type ProfileReducersTypes =
    AddPostActionType
    | SetUserProfileACType
    | SetStatusACType
    | DeletePostActionType
    | SetPhotoSuccessACType;


export default profileReducer;
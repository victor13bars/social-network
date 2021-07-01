import React from 'react';
import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileInfoType} from "../types/types";

const ADD_POST = "PROFILE/ADD-POST";
const DELETE_POST = "PROFILE/DELETE-POST";
const SET_USER_PROFILE = "PROFILE/SET-USER-PROFILE";
const SET_STATUS = "PROFILE/SET-STATUS";
const SAVE_PHOTO = "PROFILE/SAVE-PHOTO";

export type ProfilePInitialStateType = typeof initialState;

let initialState = {
    posts: [
        {id: 1, message: "Hello", likeCount: 12},
        {id: 2, message: "How are you?", likeCount: 25},
    ] as Array<PostType>,
    profile: null as ProfileInfoType | null,
    status: "123"
}

const profileReducer = (state = initialState, action: ProfileReducersTypes): ProfilePInitialStateType => {
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
    type: typeof SET_USER_PROFILE,
    profile: ProfileInfoType
}
export const setUserProfile = (profile: ProfileInfoType): SetUserProfileACType => ({
    type: SET_USER_PROFILE,
    profile: profile
})

export type AddPostActionType = {
    type: typeof ADD_POST,
    newMyPost: string
}
export const addPostAC = (newMyPost: string): AddPostActionType => ({
    type: ADD_POST,
    newMyPost
})

export type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePostAC = (postId: number): DeletePostActionType => ({
    type: DELETE_POST,
    postId
})

export type SetStatusACType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): SetStatusACType => ({
    type: SET_STATUS,
    status: status
})

export type SetPhotoSuccessACType = {
    type: typeof SAVE_PHOTO,
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

export const saveProfile = (profile: ProfileInfoType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id
    let response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunkCreator(userId))
    } else {
        // debugger
        // let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export type ProfileReducersTypes =
    AddPostActionType
    | SetUserProfileACType
    | SetStatusACType
    | DeletePostActionType
    | SetPhotoSuccessACType;


export default profileReducer;
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileInfoType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {ResultCodeEnum} from "../api/api";
import {BaseThunkType, InferActionsType} from "./redux-store";

export type ProfileInitialStateType = typeof initialState;

let initialState = {
    posts: [
        {id: 1, message: "Hello", likeCount: 12},
        {id: 2, message: "How are you?", likeCount: 25},
    ] as Array<PostType>,
    profile: null as ProfileInfoType | null,
    status: "123"
}

const profileReducer = (state = initialState, action: ProfileActionType): ProfileInitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST': {
            const newPost: PostType = {id: 5, message: action.newMyPost, likeCount: 0};
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case 'PROFILE/SET-USER-PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'PROFILE/SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'PROFILE/DELETE-POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        }
        case 'PROFILE/SAVE-PHOTO': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileInfoType
            }
        }
        default:
            return state;
    }
}

export type ProfileActionType = InferActionsType<typeof actions>
export type ThunkType = BaseThunkType<ProfileActionType | FormAction>
export const actions = {
    setUserProfile: (profile: ProfileInfoType) => ({type: 'PROFILE/SET-USER-PROFILE', profile: profile} as const),
    addPostAC: (newMyPost: string) => ({type: 'PROFILE/ADD-POST', newMyPost} as const),
    deletePostAC: (postId: number) => ({type: 'PROFILE/DELETE-POST', postId} as const),
    setStatus: (status: string) => ({type: 'PROFILE/SET-STATUS', status: status} as const),
    setPhotoSuccess: (photos: PhotosType) => ({type: 'PROFILE/SAVE-PHOTO', photos} as const)
}

export const getUserProfileThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data))
}

export const getStatusThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data))
}

export const updateStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setPhotoSuccess(data.data))
    }
}

export const saveProfile = (profile: ProfileInfoType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    let data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfileThunkCreator(userId))
        } else {
            throw  new Error("userId can't be null")
        }

    } else {
        // let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;
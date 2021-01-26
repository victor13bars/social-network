import {UserType} from "./users-reducer";
import {ProfileInfoType} from "./profile-reducer";
import {usersAPI} from "../api/api";

export enum ACTIONS_TYPE {
    TOGGLE_IS_FETCHING = 'TOGGLE/IS_FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE/IS_FOLLOWING_PROGRESS',
    SET_TOTAL_COUNT = 'USERS/SET_TOTAL_COUNT',
    SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE',
    SET_USERS = 'USERS/SET_USERS',
    FOLLOW = 'USERS/FOLLOW',
    UNFOLLOW = 'USERS/UNFOLLOW',
    ADD_POST = "PROFILE/ADD-POST",
    SET_USER_PROFILE = "PROFILE/SET-USER-PROFILE",
    UPDATE_NEW_POST_TEXT = "PROFILE/UPDATE-NEW-POST-TEXT",
    SEND_MESSAGE = "DIALOGS/SEND-MESSAGE",
    UPDATE_NEW_MESSAGE_BODY = "DIALOGS/UPDATE-NEW-MESSAGE-BODY"
}


export type ToggleIsFetchingACType = {
    type: ACTIONS_TYPE.TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingACType => {
    return {
        type: ACTIONS_TYPE.TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
}

export type ToggleIsFollowingACType = {
    type: ACTIONS_TYPE.TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}

export const toggleIsFollowing = (isFetching: boolean, userId: number): ToggleIsFollowingACType => {
    return {
        type: ACTIONS_TYPE.TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching: isFetching,
        userId: userId
    }
}

export type SetTotalUsersCountACType = {
    type: ACTIONS_TYPE.SET_TOTAL_COUNT,
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountACType => {
    return {
        type: ACTIONS_TYPE.SET_TOTAL_COUNT,
        totalUsersCount: totalUsersCount

    }
}

export type SetCurrentPageACType = {
    type: ACTIONS_TYPE.SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => {
    return {
        type: ACTIONS_TYPE.SET_CURRENT_PAGE,
        currentPage: currentPage

    }
}

export type FollowACType = {
    type: ACTIONS_TYPE.FOLLOW,
    id: number
}
export const followSuccess = (userId: number): FollowACType => {
    return {
        type: ACTIONS_TYPE.FOLLOW,
        id: userId
    }
}

export type UnFollowACType = {
    type: ACTIONS_TYPE.UNFOLLOW,
    id: number
}
export const unfollowSuccess = (userId: number): UnFollowACType => {
    return {
        type: ACTIONS_TYPE.UNFOLLOW,
        id: userId
    }
}

export type SetUsersACType = {
    type: ACTIONS_TYPE.SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersACType => {
    return {
        type: ACTIONS_TYPE.SET_USERS,
        users: users
    }
}

export type UsersReducersTypes =
    FollowACType
    | UnFollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
    | ToggleIsFetchingACType
    | ToggleIsFollowingACType;

export type SetUserProfileACType = {
    type: ACTIONS_TYPE.SET_USER_PROFILE,
    profile: ProfileInfoType
}
export const setUserProfile = (profile: ProfileInfoType): SetUserProfileACType => {
    return {
        type: ACTIONS_TYPE.SET_USER_PROFILE,
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
    type: ACTIONS_TYPE.ADD_POST
}
export const addPostAC = (): AddPostActionType => {
    return {
        type: ACTIONS_TYPE.ADD_POST
    }
}

export type UpdateNewPostTextActionType = {
    type: ACTIONS_TYPE.UPDATE_NEW_POST_TEXT
    newText: string
}
export const updateNewPostTextAC = (newText: string): UpdateNewPostTextActionType => {
    return {
        type: ACTIONS_TYPE.UPDATE_NEW_POST_TEXT, newText: newText
    }
}

export type ProfileReducersTypes = UpdateNewPostTextActionType | AddPostActionType | SetUserProfileACType;

export type UpdateNewMessageBodyActionType = {
    type: ACTIONS_TYPE.UPDATE_NEW_MESSAGE_BODY
    body: string
}
export const updateNewMessageBodyAC = (body: string): UpdateNewMessageBodyActionType => {
    return {
        type: ACTIONS_TYPE.UPDATE_NEW_MESSAGE_BODY, body: body
    }
}

export type SendMessageActionType = {
    type: ACTIONS_TYPE.SEND_MESSAGE
}
export const sendMessageAC = (): SendMessageActionType => {
    return {
        type: ACTIONS_TYPE.SEND_MESSAGE
    }
}

export type DialogsReducersTypes = SendMessageActionType | UpdateNewMessageBodyActionType;

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))

        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        });
    }
}

export const followThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFollowing(true, userId))
        usersAPI.follow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleIsFollowing(false, userId))
        });
    }
}

export const unfollowThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFollowing(true, userId))
        usersAPI.unfollow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleIsFollowing(false, userId))
        });
    }
}
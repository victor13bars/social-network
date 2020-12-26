import {UserType} from "./users-reducer";

export enum ACTIONS_TYPE {
    TOGGLE_IS_FETCHING = 'TOGGLE/IS_FETCHING',
    SET_TOTAL_COUNT = 'USERS/SET_TOTAL_COUNT',
    SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE',
    SET_USERS = 'USERS/SET_USERS',
    FOLLOW = 'USERS/FOLLOW',
    UNFOLLOW = 'USERS/UNFOLLOW',
    ADD_POST = "PROFILE/ADD-POST",
    UPDATE_NEW_POST_TEXT = "PROFILE/UPDATE-NEW-POST-TEXT",
    SEND_MESSAGE = "DIALOGS/SEND-MESSAGE",
    UPDATE_NEW_MESSAGE_BODY = "DIALOGS/UPDATE-NEW-MESSAGE-BODY"
}

export type ToggleIsFetchingACType = {
    type: ACTIONS_TYPE.TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingACType => {
    return {
        type: ACTIONS_TYPE.TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
}

export type SetTotalUsersCountACType = {
    type: ACTIONS_TYPE.SET_TOTAL_COUNT,
    totalUsersCount: number
}
export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountACType => {
    return {
        type: ACTIONS_TYPE.SET_TOTAL_COUNT,
        totalUsersCount: totalUsersCount

    }
}

export type SetCurrentPageACType = {
    type: ACTIONS_TYPE.SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => {
    return {
        type: ACTIONS_TYPE.SET_CURRENT_PAGE,
        currentPage: currentPage

    }
}

export type FollowACType = {
    type: ACTIONS_TYPE.FOLLOW,
    id: number
}
export const followAC = (userId: number): FollowACType => {
    return {
        type: ACTIONS_TYPE.FOLLOW,
        id: userId
    }
}

export type UnFollowACType = {
    type: ACTIONS_TYPE.UNFOLLOW,
    id: number
}
export const unfollowAC = (userId: number): UnFollowACType => {
    return {
        type: ACTIONS_TYPE.UNFOLLOW,
        id: userId
    }
}

export type SetUsersACType = {
    type: ACTIONS_TYPE.SET_USERS,
    users: Array<UserType>
}
export const setUsersAC = (users: Array<UserType>): SetUsersACType => {
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
    | ToggleIsFetchingACType;

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

export type ProfileReducersTypes = UpdateNewPostTextActionType | AddPostActionType;

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
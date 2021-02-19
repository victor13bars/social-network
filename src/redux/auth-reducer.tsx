import React from 'react';
import {authAPI} from "../api/api";

const SET_USER_DATA = "AUTH-SET-USER-DATA"

export type AuthType = {
    id: null,
    email: null,
    login: null,
    isFetching: boolean,
    isAuth: boolean
}
let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
}

export type SetUserDataACType = {
    type: "AUTH-SET-USER-DATA",
    data: AuthType
}

export const setAuthUserData = (data: AuthType): SetUserDataACType => {
    return {
        type: SET_USER_DATA,
        data: data
    }
}

export const getAuthUserDataThunk = () => (dispatch: any) => {
    authAPI.getAuth().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(response.data.data))
        }
    });
}

export type OwnUserDataReducersTypes = SetUserDataACType

export const authReducer = (state: AuthType = initialState, action: OwnUserDataReducersTypes) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
}

export default authReducer;
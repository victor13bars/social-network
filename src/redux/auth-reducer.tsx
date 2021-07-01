import React from 'react';
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "AUTH/SET_USER_DATA"
const SET_CAPTCHA_URL = "AUTH/SET_CAPTCHA_URL"

export type AuthInitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: AuthInitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
}


export const authReducer = (state = initialState, action: OwnUserDataReducersTypes): AuthInitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export type SetUserDataType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
}
export type SetUserDataACType = {
    type: typeof SET_USER_DATA,
    data: SetUserDataType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isFetching: boolean, isAuth: boolean): SetUserDataACType => ({
    type: SET_USER_DATA,
    data: {id, email, login, isFetching, isAuth}
})

export type SetCaptchaUrlACType = {
    type: typeof SET_CAPTCHA_URL,
    data: { captchaUrl: string }
}

export const setAuthCaptchaUrl = (captchaUrl: string): SetCaptchaUrlACType => ({
    type: SET_CAPTCHA_URL,
    data: {captchaUrl}
})

// export const getAuthUserDataThunk = () => (dispatch: any) => {
//     return authAPI.getAuth()
//         .then(response => {
//         if (response.data.resultCode === 0) {
//             let {id, login, email, isFetching, isAuth} = response.data.data
//             dispatch(setAuthUserData(id, login, email, isFetching, true))
//         }
//     });
// }
export const getAuthUserDataThunk = () => async (dispatch: any) => {
    let response = await authAPI.getAuth();

    if (response.data.resultCode === 0) {
        let {id, login, email, isFetching, isAuth} = response.data.data
        dispatch(setAuthUserData(id, login, email, isFetching, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunk())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = () => async (dispatch: any) => {

    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, false))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url

    dispatch(setAuthCaptchaUrl(captchaUrl))
}

export type OwnUserDataReducersTypes = SetUserDataACType | SetCaptchaUrlACType


export default authReducer;
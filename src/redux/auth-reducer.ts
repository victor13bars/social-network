import React from 'react';
import {ResultCodeEnum, ResultCodeForCaptcha} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsType} from "./redux-store";


let initialState = {
    id: null as (number | null),
    email: null as (string | null),
    login: null as (string | null),
    isFetching: false,
    isAuth: false,
    captchaUrl: null as (string | null),
}

export type AuthInitialStateType = typeof initialState
export type AuthActonType = InferActionsType<typeof actions>
export type ThunkType = BaseThunkType<AuthActonType | FormAction>

export const authReducer = (state = initialState, action:AuthActonType): AuthInitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

const actions = {
    setAuthUserData : (id: number | null, email: string | null, login: string | null, isFetching: boolean, isAuth: boolean) => ({type: 'SET_USER_DATA',data: {id, email, login, isFetching, isAuth}} as const),

    setAuthCaptchaUrl : (captchaUrl: string) => ({type: 'SET_CAPTCHA_URL', data: {captchaUrl}} as const),

}

// export const getAuthUserDataThunk = () => (dispatch: any) => {
//     return authAPI.getAuth()
//         .then(response => {
//         if (response.data.resultCode === 0) {
//             let {id, login, email, isFetching, isAuth} = response.data.data
//             dispatch(setAuthUserData(id, login, email, isFetching, true))
//         }
//     });
// }
export const getAuthUserDataThunk = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.getAuth();

    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email, isFetching, isAuth} = meData.data
        dispatch(actions.setAuthUserData(id, login, email, isFetching, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType =>
    async (dispatch) => {

    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserDataThunk())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = () => async (dispatch: any) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false, false))
    }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url
    dispatch(actions.setAuthCaptchaUrl(captchaUrl))
}

export default authReducer;
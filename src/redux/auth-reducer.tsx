import React from 'react';
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "AUTH/SET_USER_DATA"

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
    type: "AUTH/SET_USER_DATA",
    data: AuthType
}

export const setAuthUserData = (id: null, email: null, login: null, isFetching: boolean, isAuth: boolean): SetUserDataACType => ({
    type: SET_USER_DATA,
    data: {id, email, login, isFetching, isAuth}
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

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {

    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunk())
    } else {
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

export type OwnUserDataReducersTypes = SetUserDataACType

export const authReducer = (state: AuthType = initialState, action: OwnUserDataReducersTypes) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export default authReducer;
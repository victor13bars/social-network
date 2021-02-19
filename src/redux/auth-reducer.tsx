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

export const setAuthUserData = (id:null,email:null,login:null,isFetching:boolean,isAuth:boolean): SetUserDataACType => {
    return {
        type: SET_USER_DATA,
        data: {id,email,login,isFetching,isAuth}
    }
}

export const getAuthUserDataThunk = () => (dispatch: any) => {
    authAPI.getAuth().then(response => {
        if (response.data.resultCode === 0) {
            let {id,login,email,isFetching,isAuth} = response.data.data
            dispatch(setAuthUserData(id,login,email,isFetching,true))
        }
    });
}

export const login = (email:string, password:string, rememberMe:boolean) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserDataThunk())
        }
    });
}

export const logout = () => (dispatch: any) => {
    authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null,null,null,false,false))
        }
    });
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
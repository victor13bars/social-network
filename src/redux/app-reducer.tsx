import React from 'react';
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserDataThunk} from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export type InitializedAuthType = {
    initialized: boolean
}
let initialState = {
    initialized: false
}

export type InitializedSuccesACType = {
    type: "INITIALIZED-SUCCESS"

}

export const initializedSucces = (): InitializedSuccesACType => {
    return {
        type: "INITIALIZED-SUCCESS"
    }
}

export const initializeAppThunk = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataThunk());
    promise.then(() => {
        dispatch(initializedSucces());
    });
}


export const appReducer = (state: InitializedAuthType = initialState, action: InitializedSuccesACType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export default appReducer;
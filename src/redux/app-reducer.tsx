import React from 'react';
import {getAuthUserDataThunk} from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export type InitializedAuthType = {
    initialized: boolean
}
let initialState: InitializedAuthType = {
    initialized: false
}

export type InitializedSuccessACType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessACType => ({type: INITIALIZED_SUCCESS})

export const initializeAppThunk = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataThunk());
    promise.then(() => {
        dispatch(initializedSuccess());
    });
}

export const appReducer = (state = initialState, action: InitializedSuccessACType):InitializedAuthType => {
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
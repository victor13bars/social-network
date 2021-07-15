import React from 'react';
import {ResultCodeEnum, ResultCodeForCaptcha} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {chatAPI, ChatMessageResponseType} from "../api/chat-api";
import {Dispatch} from "redux";


let initialState = {
    messages: [] as Array<ChatMessageResponseType>
}

export type AuthInitialStateType = typeof initialState
export type AuthActonType = InferActionsType<typeof actions>
export type ThunkType = BaseThunkType<AuthActonType | FormAction>

export const chatReducer = (state = initialState, action: AuthActonType): AuthInitialStateType => {
    switch (action.type) {
        case 'SET_MESSAGE_RECEIVED':
            return {
                ...state, messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}

const actions = {
    messageReceived: (messages: Array<ChatMessageResponseType>) => ({
        type: 'SET_MESSAGE_RECEIVED',
        payload: {messages}
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageResponseType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messageReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}
export default chatReducer;
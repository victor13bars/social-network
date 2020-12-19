import React from 'react';

import {ACTIONS_TYPE, DialogsReducersTypes} from "./action";

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type MessagesPagesType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}
export type DialogsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

let initialState = {
    dialogs: [
        {id: 1, name: "Victor"},
        {id: 2, name: "Valera"},
        {id: 3, name: "Veronika"},
        {id: 4, name: "Alex"},
        {id: 5, name: "Dima"},
        {id: 6, name: "Toxa"}
    ],
    messages: [
        {id: 1, message: "Hello"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "kikii"},
        {id: 4, message: "Alex"},
        {id: 5, message: "Dima"},
        {id: 6, message: "Toxa"}
    ],
    newMessageBody: ""
}

const dialogsReducer = (state: MessagesPagesType = initialState, action: DialogsReducersTypes) => {


    switch (action.type) {
        case ACTIONS_TYPE.UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case ACTIONS_TYPE.SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: "",
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;
    }
}

export default dialogsReducer;
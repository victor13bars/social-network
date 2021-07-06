import React from 'react';
import {InferActionsType} from "./redux-store";


export  type DialogsInitialStateType = typeof initialState;

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "Victor"},
        {id: 2, name: "Valera"},
        {id: 3, name: "Veronika"},
        {id: 4, name: "Alex"},
        {id: 5, name: "Dima"},
        {id: 6, name: "Toxa"}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "Hello"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "kikii"},
        {id: 4, message: "Alex"},
        {id: 5, message: "Dima"},
        {id: 6, message: "Toxa"}
    ] as Array<MessageType>
}

const dialogsReducer = (state = initialState, action: DialogsActionTypes):DialogsInitialStateType => {
    switch (action.type) {
        case 'DIALOGS/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;
    }
}

export type DialogsActionTypes = InferActionsType<typeof actions>

export const actions = {
    sendMessageAC : (newMessageBody: string) => ({
        type: 'DIALOGS/SEND-MESSAGE', newMessageBody
    } as const)
}

export default dialogsReducer;
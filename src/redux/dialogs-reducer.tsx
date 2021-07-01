import React from 'react';

const SEND_MESSAGE = "DIALOGS/SEND-MESSAGE";

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

const dialogsReducer = (state = initialState, action: DialogsReducersTypes):DialogsInitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;
    }
}

export type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}
export const sendMessageAC = (newMessageBody: string): SendMessageActionType => ({
    type: SEND_MESSAGE, newMessageBody
})

export type DialogsReducersTypes = SendMessageActionType;

export default dialogsReducer;
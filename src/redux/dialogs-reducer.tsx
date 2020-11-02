import React from 'react';
import {
    AddPostActionType,
    MessagesPagesType,
    SendMessageActionType, UpdateNewMessageBodyActionType, UpdateNewPostTextActionType
} from "./store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

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

const dialogsReducer = (state: MessagesPagesType = initialState, action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY":
            state.newMessageBody = action.body;
            return state;
        case "SEND-MESSAGE":
            let body = state.newMessageBody;
            state.newMessageBody = "";
            state.messages.push({id: 6, message: body});
            return state;
        default:
            return state;
    }
}
export const sendMessageCreator = (): SendMessageActionType => {
    return {
        type: SEND_MESSAGE
    }
}
export const updateNewMessageBodyCreator = (body: string): UpdateNewMessageBodyActionType => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY, body: body
    }
}

export default dialogsReducer;
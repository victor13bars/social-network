import React from 'react';
import {
    AddPostActionType,
    MessagesPagesType,
    SendMessageActionType, UpdateNewMessageBodyActionType, UpdateNewPostTextActionType
} from "./state";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

const dialogsReducer = (state: MessagesPagesType, action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => {
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
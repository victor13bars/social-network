import React from 'react';
import {
    AddPostActionType,
    PostType, ProfilePageType, SendMessageActionType, UpdateNewMessageBodyActionType,
    UpdateNewPostTextActionType
} from "./state";
import {act} from "react-dom/test-utils";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const profileReducer = (state:ProfilePageType, action:AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => {
    switch (action.type){
        case ADD_POST:
            const newPost: PostType = {id: 5, message: state.messageForNewPost, likeCount: 0};
            state.posts.push(newPost);
            state.messageForNewPost = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.messageForNewPost = action.newText;
            return state;
        default:
            return state;
    }
}
export const addPostActionCreator = (): AddPostActionType => {
    return {
        type: ADD_POST
    }
}
export const updateNewPostTextActionCreator = (newText: string): UpdateNewPostTextActionType => {
    return {
        type: UPDATE_NEW_POST_TEXT, newText: newText
    }
}

export default profileReducer;
import React from 'react';
import {
    AddPostActionType,
    PostType, ProfilePageType, SendMessageActionType, UpdateNewMessageBodyActionType,
    UpdateNewPostTextActionType
} from "./store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
    posts: [
        {id: 1, message: "Hello", likeCount: 12},
        {id: 2, message: "How are you?", likeCount: 25},
    ],
    messageForNewPost: ""
}

const profileReducer = (state: ProfilePageType = initialState, action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {id: 5, message: state.messageForNewPost, likeCount: 0};
            return {
                ...state,
                messageForNewPost: "",
                posts: [...state.posts, newPost]
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                messageForNewPost: action.newText
            }
        }
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
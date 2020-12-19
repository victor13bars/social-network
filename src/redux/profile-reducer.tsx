import React from 'react';
import {ACTIONS_TYPE, ProfileReducersTypes} from "./action";
import {PostType} from "../components/Profile/MyPosts/MyPosts";



export type ProfilePageType = {
    posts: Array<PostType>
    messageForNewPost: string
}

let initialState = {
    posts: [
        {id: 1, message: "Hello", likeCount: 12},
        {id: 2, message: "How are you?", likeCount: 25},
    ],
    messageForNewPost: ""
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileReducersTypes) => {
    switch (action.type) {
        case ACTIONS_TYPE.ADD_POST: {
            const newPost: PostType = {id: 5, message: state.messageForNewPost, likeCount: 0};
            return {
                ...state,
                messageForNewPost: "",
                posts: [...state.posts, newPost]
            }
        }
        case ACTIONS_TYPE.UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                messageForNewPost: action.newText
            }
        }
        default:
            return state;
    }
}

export default profileReducer;
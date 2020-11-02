import React, {ChangeEvent} from "react";
import {
    AddPostActionType, PostType,
    UpdateNewPostTextActionType
} from "../../../redux/store";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

type MyPostsContainerType = {
    store: any
}

const MyPostsContainer = (props: MyPostsContainerType) => {
    console.log(props.store);

    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text: string) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action);
    }

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profileReducer.posts}
                 newPostText={state.profileReducer.newPostText}/>
    )
}

export default MyPostsContainer;

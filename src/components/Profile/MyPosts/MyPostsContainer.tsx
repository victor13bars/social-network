import React, {ChangeEvent} from "react";
import {
    AddPostActionType, PostType,
    UpdateNewPostTextActionType
} from "../../../redux/store";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

type MyPostsContainerType = {
    store: any
}

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();

                    let addPost = () => {
                        store.dispatch(addPostActionCreator());
                    }

                    let onPostChange = (text: string) => {
                        let action = updateNewPostTextActionCreator(text);
                        store.dispatch(action);
                    }

                    return <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                                    posts={state.profileReducer.posts}
                                    newPostText={state.profileReducer.messageForNewPost}/>
                }
            }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;

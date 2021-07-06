import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {actions, ProfileActionType} from "../../../redux/profile-reducer";


// const MyPostsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let state = store.getState();
//
//                     let addPost = () => {
//                         store.dispatch(addPostActionCreator());
//                     }
//
//                     let onPostChange = (text: string) => {
//                         let action = updateNewPostTextActionCreator(text);
//                         store.dispatch(action);
//                     }
//
//                     return <MyPosts updateNewPostText={onPostChange} addPost={addPost}
//                                     posts={state.profileReducer.posts}
//                                     newPostText={state.profileReducer.messageForNewPost}/>
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}
let mapDispatchToProps = (dispatch: Dispatch<ProfileActionType>) => {
    return {
        addPost: (newMyPost: string) => {
            dispatch(actions.addPostAC(newMyPost));
        }

    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;

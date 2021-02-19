import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostAC, ProfileReducersTypes} from "../../../redux/action";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

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
        posts: state.profilePage.posts,
        newPostText: state.profilePage.messageForNewPost
    }
}
let mapDispatchToProps = (dispatch: Dispatch<ProfileReducersTypes>) => {
    return {
        addPost: (newMyPost: string) => {
            dispatch(addPostAC(newMyPost));
        }

    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;

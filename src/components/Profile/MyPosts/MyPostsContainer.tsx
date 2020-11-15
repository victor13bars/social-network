import React, {ChangeEvent} from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

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

let mapStateToProps = (state: any) => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.messageForNewPost
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        }

    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;

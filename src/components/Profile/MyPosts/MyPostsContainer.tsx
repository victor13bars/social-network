import React from "react";
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {actions} from "../../../redux/profile-reducer";

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStateToProps, {
    addPost: actions.addPostAC
})(MyPosts);
export default MyPostsContainer;

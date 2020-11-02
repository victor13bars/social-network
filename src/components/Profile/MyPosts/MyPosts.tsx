import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {
    AddPostActionType,
    PostType,
    UpdateNewPostTextActionType
} from "../../../redux/store";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";

type MyPostsType = {
    newPostText: string
    posts: Array<PostType>
    addPost: () => void
    updateNewPostText: (text:string) => void
}

const MyPosts = (props: MyPostsType) => {
    let postsElements = props.posts.map(p => <Post id={p.id} message={p.message} likeCount={p.likeCount}/>)

    let onAddPost = () => {
        props.addPost();
        //props.dispatch(addPostActionCreator());
    }

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.updateNewPostText(text);
        //props.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>

                <div>
                    <textarea value={props.newPostText} onChange={onPostChange}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}

            </div>
        </div>

    )
}

export default MyPosts;
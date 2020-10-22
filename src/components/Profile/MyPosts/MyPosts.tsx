import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {AddPostActionType, PostType, UpdateNewPostTextActionType} from "../../../redux/state";

type MyPostsType = {
    newPostText: string
    posts: Array<PostType>
    dispatch: (action: AddPostActionType | UpdateNewPostTextActionType) => void
}

const MyPosts = (props: MyPostsType) => {
    let postsElements = props.posts.map(p => <Post id={p.id} message={p.message} likeCount={p.likeCount}/>)

    let addPost = () => {
        props.dispatch({type:"ADD-POST"});
    }

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        let text = e.currentTarget.value;
        props.dispatch({type: "UPDATE-NEW-POST-TEXT", newText: text})
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>

                <div>
                    <textarea value={props.newPostText} onChange={onPostChange}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}

            </div>
        </div>

    )
}

export default MyPosts;
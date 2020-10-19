import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/state";

type MyPostsType = {
    newPostText: string
    posts: Array<PostType>
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

const MyPosts = (props: MyPostsType) => {
    let postsElements = props.posts.map(p => <Post id={p.id} message={p.message} likeCount={p.likeCount}/>)

    let addPost = () => {
        props.addPost();
    }

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{props.updateNewPostText(e.currentTarget.value)}

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
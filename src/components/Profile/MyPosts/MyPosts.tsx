import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType = {
    newMyPost: string
}

export type PostType = {
    id: number
    message: string
    likeCount: number
}

type MyPostsType = {
    newPostText: string
    posts: Array<PostType>
    addPost: (newMyPost: string) => void
}

const MyPosts = (props: MyPostsType) => {
    console.log(props.posts)
    let postsElements = props.posts.map(p => <Post id={p.id} message={p.message} likeCount={p.likeCount}/>)

    // let onAddPost = () => {
    //     props.addPost();
    //     //props.dispatch(addPostActionCreator());
    // }
    //
    // let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     let text = e.currentTarget.value;
    //     props.updateNewPostText(text);
    //     //props.dispatch(updateNewPostTextActionCreator(text))
    // }

    let addNewPost = (values: FormDataType) => {
        props.addPost(values.newMyPost)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <AddMyPostsFormRedux onSubmit={addNewPost}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>

    )
}

const AddMyPostsForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newMyPost" placeholder="Enter your post"/>
                {/*<textarea value={props.newPostText} onChange={onPostChange}/>*/}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddMyPostsFormRedux = reduxForm<FormDataType>({form: 'profileAddNewMyPost'})(AddMyPostsForm)

export default MyPosts;
import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

type FormDataType = {
    newMyPost: string
}

export type PostType = {
    id: number
    message: string
    likeCount: number
}

type MyPostsType = {
    posts: Array<PostType>
    addPost: (newMyPost: string) => void
}

const maxLength10 = maxLengthCreator(10)

const MyPosts = React.memo((props: MyPostsType) => {
    console.log(props.posts)
    let postsElements = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likeCount={p.likeCount}/>)

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
})

const AddMyPostsForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newMyPost" placeholder="Enter your post"
                       validate={[required, maxLength10]}/>
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
import React, {ChangeEvent, useEffect, useState} from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {PostType} from "../../../types/types";

type FormDataType = {
    newMyPost: string
}

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newMyPost: string) => void
}

const maxLength10 = maxLengthCreator(10)

const MyPosts:React.FC<MapPropsType & DispatchPropsType> = (props) => {

    const [a, setA] = useState(1)


    useEffect( ()=> {
        setTimeout( ()=> {
            setA(2)
            console.log('hello', a)
        }, 2000 )
    },[a] )


    let postsElements = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likeCount={p.likeCount}/>)

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

const MyPostsMemorized = React.memo(MyPosts)

type FormDataValuesTypeKeys = Extract<keyof FormDataType, string>

const AddMyPostsForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<FormDataValuesTypeKeys>("Enter your post", 'newMyPost', Textarea, [required,maxLength10])}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddMyPostsFormRedux = reduxForm<FormDataType>({form: 'profileAddNewMyPost'})(AddMyPostsForm)

export default MyPostsMemorized;
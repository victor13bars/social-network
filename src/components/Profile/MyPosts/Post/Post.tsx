import React from "react";
import classes from './Post.module.css';

type PostType ={
    id:number
    message:string
    likeCount:number
}

const Post:React.FC<PostType> = (props) => {
    return (
        <div className={classes.item}>
            <img
                src="https://avatars.mds.yandex.net/get-pdb/750997/2f4a61ff-0c60-41d6-a2f1-049bc4ee8f21/s1200?webp=false"
                alt=""/>
            {props.message}
            <div>
                <span>like</span> {props.likeCount}
            </div>
        </div>
    )
}

export default Post;
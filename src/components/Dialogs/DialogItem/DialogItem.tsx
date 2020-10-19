import React from "react";
import classes from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

type DialogItemType = {
    id: number
    name: string
}

const DialogItem = (props: DialogItemType) => {
    let path ="/dialog/" + props.id;
    return (

        <div className={classes.dialog + " " + classes.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;
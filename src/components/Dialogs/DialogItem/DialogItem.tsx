import React from "react";
import classes from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";
import {DialogType} from "../../../redux/dialogs-reducer";

const DialogItem:React.FC<DialogType> = (props) => {
    let path ="/dialog/" + props.id;
    return (

        <div className={classes.dialog + " " + classes.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;
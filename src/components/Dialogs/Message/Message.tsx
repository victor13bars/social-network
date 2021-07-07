import React from "react";
import classes from "./../Dialogs.module.css"
import {MessageType} from "../../../redux/dialogs-reducer";

const Message:React.FC<MessageType> = (props) => {
    return (
        <div className={classes.message}>
            {props.message}
        </div>
    )
}

export default Message;
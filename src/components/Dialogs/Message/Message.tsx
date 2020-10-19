import React from "react";
import classes from "./../Dialogs.module.css"

type MessageType = {
    id:number
    message: string
}

const Message = (props: MessageType) => {
    return (
        <div className={classes.message}>
            {props.message}
        </div>
    )
}

export default Message;
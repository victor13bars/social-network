import React from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MessagesPagesType} from "../../redux/state";



type DialogsType = {
  state:MessagesPagesType
}

const Dialogs = (props: DialogsType) => {


    let dialogsItems = props.state.dialogs.map(dialog => (<DialogItem id={dialog.id} name={dialog.name}/>));

    let messagesItems = props.state.messages.map(ms => <Message id={ms.id} message={ms.message}/>);

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsItems}
            </div>

            <div className={classes.messages}>
                {messagesItems}
            </div>
        </div>
    )
}

export default Dialogs;
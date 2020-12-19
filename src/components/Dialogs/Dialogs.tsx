import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsType} from "../../redux/dialogs-reducer";


const Dialogs = (props: DialogsType) => {
    console.log(props)

    let dialogsItems = props.dialogs.map(dialog => (<DialogItem id={dialog.id} key={dialog.id} name={dialog.name}/>));
    let messagesItems = props.messages.map(ms => <Message id={ms.id} message={ms.message} key={ms.id}/>);
    let newMessageBody = props.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
        //props.dispatch(sendMessageCreator())
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);

    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsItems}
            </div>

            <div className={classes.messages}>
                <div>{messagesItems}</div>
                <div><textarea value={newMessageBody}
                               onChange={onNewMessageChange}
                               placeholder="Enter your message "></textarea></div>
                <div>
                    <button onClick={onSendMessageClick}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
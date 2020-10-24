import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
    AddPostActionType,
    MessagesPagesType, SendMessageActionType,UpdateNewMessageBodyActionType,
    UpdateNewPostTextActionType
} from "../../redux/state";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";


type DialogsType = {
    state: MessagesPagesType
    dispatch: (action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => void
}

const Dialogs = (props: DialogsType) => {


    let dialogsItems = props.state.dialogs.map(dialog => (<DialogItem id={dialog.id} name={dialog.name}/>));
    let messagesItems = props.state.messages.map(ms => <Message id={ms.id} message={ms.message}/>);
    let newMessageBody = props.state.newMessageBody;

    let onSendMessageClick = () => {props.dispatch(sendMessageCreator())}
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.dispatch(updateNewMessageBodyCreator(body))
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
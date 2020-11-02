import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
    AddPostActionType,
    MessagesPagesType, SendMessageActionType,UpdateNewMessageBodyActionType,
    UpdateNewPostTextActionType
} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";


type DialogsType = {
    store: any
}

const DialogsContainer = (props: DialogsType) => {
   console.log(props.store)

    let state = props.store.getState().dialogsReducer;

    let onSendMessageClick = () => {props.store.dispatch(sendMessageCreator())}

    let onNewMessageChange = (body:string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
       <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} state={state}/>
    )
}

export default DialogsContainer;
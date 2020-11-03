import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
    AddPostActionType,
    MessagesPagesType, SendMessageActionType, UpdateNewMessageBodyActionType,
    UpdateNewPostTextActionType
} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


type DialogsType = {
    store: any
}

const DialogsContainer = () => {

    return <StoreContext.Consumer>
        {
            (store) => {
                let state = store.getState().dialogsReducer;

                let onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator())
                }

                let onNewMessageChange = (body: string) => {
                    store.dispatch(updateNewMessageBodyCreator(body))
                }
                return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}
                                state={state}/>
            }
        }
    </StoreContext.Consumer>

}

export default DialogsContainer;

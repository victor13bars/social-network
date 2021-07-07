import React from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type FormDataType = {
    newMessageBody: string
}

export type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    sendMessage: (newMessageBody: string) => void,
}

const maxLength10 = maxLengthCreator(10)

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogsItems = props.dialogs.map(dialog => (<DialogItem id={dialog.id} key={dialog.id} name={dialog.name}/>));
    let messagesItems = props.messages.map(ms => <Message id={ms.id} message={ms.message} key={ms.id}/>);

    let addNewMessage = (values: FormDataType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsItems}
            </div>

            <div className={classes.messages}>
                <div>
                    {messagesItems}
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>

            </div>
        </div>
    )
}

type FormDataValuesTypeKeys = Extract<keyof FormDataType, string>

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<FormDataValuesTypeKeys>("Enter your message", 'newMessageBody', Textarea, [required, maxLength10])}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

// @ts-ignore
const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;
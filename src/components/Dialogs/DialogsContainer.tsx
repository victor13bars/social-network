import React, {ChangeEvent, Consumer} from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {DialogsReducersTypes, sendMessageAC, updateNewMessageBodyAC} from "../../redux/action";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages:state.dialogsPage.messages,
        newMessageBody:state.dialogsPage.newMessageBody
    }
}
let mapDispatchToProps = (dispatch: Dispatch<DialogsReducersTypes>) => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))

        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;

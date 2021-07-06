import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {actions, DialogsActionTypes} from "../../redux/dialogs-reducer";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    }
}
let mapDispatchToProps = (dispatch: Dispatch<DialogsActionTypes>) => {
    return {
        sendMessage: (newMessageBody:string) => {
            dispatch(actions.sendMessageAC(newMessageBody))
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);

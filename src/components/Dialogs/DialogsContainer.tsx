import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {actions} from "../../redux/dialogs-reducer";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        sendMessage:actions.sendMessageAC
    }),
    withAuthRedirect
)(Dialogs);

import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AuthType, getAuthUserDataThunk, logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


export type MapStatePropsType = {
    auth: null | AuthType
}
type MapDispatchPropsType = {
    getAuthUserDataThunk: () => void
    logout: () => void
}

export type AuthPropsType = MapDispatchPropsType & MapStatePropsType

class HeaderContainer extends React.Component<any, AuthPropsType> {


    render() {
        return <Header {...this.props} auth={this.props.auth} logout={this.props.logout}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    auth: state.auth
})
export default connect(mapStateToProps, {getAuthUserDataThunk,logout})(HeaderContainer);
import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AuthType, getAuthUserDataThunk} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


export type MapStatePropsType = {
    auth: null | AuthType
}
type MapDispatchPropsType = {
    getAuthUserDataThunk: () => void
}

export type AuthPropsType = MapDispatchPropsType & MapStatePropsType

class HeaderContainer extends React.Component<any, AuthPropsType> {
    componentDidMount() {
        this.props.getAuthUserDataThunk()
    }

    render() {
        return <Header {...this.props} auth={this.props.auth}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    auth: state.auth
})
export default connect(mapStateToProps, {getAuthUserDataThunk})(HeaderContainer);
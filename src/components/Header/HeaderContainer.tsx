import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AuthType, setAuthUserData} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {authAPI} from "../../api/api";

export type MapStatePropsType = {
    auth: null | AuthType
}
type MapDispatchPropsType = {
    setAuthUserData: (data: AuthType) => void
}

export type AuthPropsType = MapDispatchPropsType & MapStatePropsType

class HeaderContainer extends React.Component<any, AuthPropsType> {
    componentDidMount() {
        authAPI.getAuth().then(data => {
            if (data.resultCode === 0) {
                this.props.setAuthUserData(data.data)
            }
        });
    }

    render() {
        return <Header {...this.props} auth={this.props.auth}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    auth: state.auth
})
export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
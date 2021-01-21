import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AuthType, setAuthUserData} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

export type MapStatePropsType = {
    auth: null | AuthType
}
type MapDispatchPropsType = {
    setAuthUserData: (data: AuthType) => void
}

export type AuthPropsType = MapDispatchPropsType & MapStatePropsType

class HeaderContainer extends React.Component<any, AuthPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
            if (response.data.resultCode === 0) {
                this.props.setAuthUserData(response.data.data)
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
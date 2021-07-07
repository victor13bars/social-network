import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {}

let mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<WCP>(Component: ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as WCP}/>
    }


let ConnectedAuthRedirectComponent = connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)

return ConnectedAuthRedirectComponent;
}
;
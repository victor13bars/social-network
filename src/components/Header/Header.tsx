import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import {AuthType} from "../../redux/auth-reducer";

export type HeaderPropsType = {
    auth: null | AuthType
}
const Header = (props:HeaderPropsType) => {
    return (
        <header className={classes.header}>
            <img src="https://miro.medium.com/max/1200/1*OQOVtYZWdAqGkWmZT4_BFw.jpeg" alt=""/>
            <div className={classes.loginBlock}>
                {props.auth?.isAuth? props.auth.login:
                <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export  default Header;
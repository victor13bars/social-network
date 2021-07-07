import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import {MapDispatchPropsType, MapStatePropsType} from "./HeaderContainer";


const Header:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    return (
        <header className={classes.header}>
            <img src="https://miro.medium.com/max/1200/1*OQOVtYZWdAqGkWmZT4_BFw.jpeg" alt=""/>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}></button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;
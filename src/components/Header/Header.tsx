import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import {Avatar, Col, Layout, Menu, Row, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";
import {UserOutlined} from "@ant-design/icons";





const {Header} = Layout;

export const AppHeader: React.FC = (props) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)
    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"> <NavLink to="/developers">Developers</NavLink></Menu.Item>
                        {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                        {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                    </Menu>
                </Col>

                {isAuth ?
                    <>
                        <Col span={4}>
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Col>
                        <Col span={2}>
                            <Button onClick={logoutCallback}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <NavLink to={'/login'}>Login</NavLink>
                        </Button>
                    </Col>}
            </Row>
        </Header>
        // <header className={classes.header}>
        //     <img src="https://miro.medium.com/max/1200/1*OQOVtYZWdAqGkWmZT4_BFw.jpeg" alt=""/>
        //     <div className={classes.loginBlock}>
        //         {props.isAuth
        //             ? <div>{props.login} - <button onClick={props.logout}></button></div>
        //             : <NavLink to={'/login'}>Login</NavLink>}
        //     </div>
        // </header>
    )
}


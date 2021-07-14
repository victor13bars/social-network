import React from 'react';
import {HashRouter, NavLink, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeAppThunk, InitializedAuthType} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {UserPage} from "./components/Users/UsersContainer";
import {Login} from "./components/Login/Login";
import "antd/dist/antd.css";
import './App.css';
import {Breadcrumb, Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {AppHeader} from "./components/Header/Header";
// import ChatPage from "./pages/Chat/ChatPage";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeAppThunk: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedChatPage = withSuspense(ChatPage);
const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured")
    }

    componentDidMount() {
        this.props.initializeAppThunk()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Layout>
                <AppHeader/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                // defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1">
                                        <NavLink to="/profile">Profile</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <NavLink to="/dialogs">Message</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="5">
                                        <NavLink to="/developers">Users</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                                    <Menu.Item key="9">
                                        <NavLink to="/chat">Chat</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Redirect exact from="/" to="/profile"/>
                                <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                                <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                                <Route path='/developers' render={() => <UserPage pageTitle="SAMURAI"/>}/>
                                <Route path='/news' component={News}/>
                                <Route path='/music' component={Music}/>
                                <Route path='/settings' component={Settings}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Route path='/chat' render={() => <SuspendedChatPage/>}/>
                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
            //
            // <div className='app-wrapper'>
            //     // <HeaderContainer/>
            //     // <Navbar/>
            //     // <div className='app-wrapper-content'>
            //     // <Switch>
            //     // <Redirect exact from="/" to="/profile"/>
            //     // <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
            //     // <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
            //     // <Route path='/users' render={() => <UserPage pageTitle="SAMURAI"/>}/>
            //     // <Route path='/news' component={News}/>
            //     // <Route path='/music' component={Music}/>
            //     // <Route path='/settings' component={Settings}/>
            //     // <Route path='/login' render={() => <Login/>}/>
            //     // <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
            //     // </Switch>
            //     // </div>
            //     //
            //     // </div>
        )
    }
}


let mapStateToProps = (state: AppStateType): InitializedAuthType => ({
    initialized: state.app.initialized
})

let AppContainer = compose
    < React.ComponentType > (
        connect(mapStateToProps, {initializeAppThunk}),
            withRouter)(App);

const SamuraiJSApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp;

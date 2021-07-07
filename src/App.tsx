import React, {Suspense} from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeAppThunk, InitializedAuthType} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeAppThunk: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

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
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Redirect exact from="/" to="/profile"/>
                        <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                        <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/news' component={News}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>

            </div>

        );
    }
}


let mapStateToProps = (state: AppStateType): InitializedAuthType => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
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

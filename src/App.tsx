import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    AddPostActionType,
    SendMessageActionType,
    StateType,
    UpdateNewMessageBodyActionType,
    UpdateNewPostTextActionType
} from "./redux/state";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

type AppType = {
    state: StateType
    dispatch: (action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => void
}

function App(props: AppType) {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs state={props.state.dialogsPage}
                                                                  dispatch={props.dispatch}/>}/>
                    <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage}
                                                                  dispatch={props.dispatch}/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>

            </div>
        </BrowserRouter>
    );
}
export default App;

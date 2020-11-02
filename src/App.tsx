import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    AddPostActionType,
    SendMessageActionType,
    StateType,
    UpdateNewMessageBodyActionType,
    UpdateNewPostTextActionType
} from "./redux/store";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import dialogsReducer from "./redux/dialogs-reducer";
import {reducerType} from "./redux/redux-store";

type AppType = {
    state: any
    dispatch: (action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => void
}

function App(props: AppType) {
    console.log(props.state);
    console.log(props.state.dialogsPage)
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs state={props.state["dialogsReducer"]}
                                                                  dispatch={props.dispatch}/>}/>
                    <Route path='/profile' render={() => <Profile profilePage={props.state["profileReducer"]}
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

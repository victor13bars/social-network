import {applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import reducer, { reducer as formReducer } from 'redux-form'
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth:authReducer,
    form:formReducer,
    app:appReducer
});

export let store: Store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof rootReducer>

export default store;

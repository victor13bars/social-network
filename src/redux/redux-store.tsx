import {applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import reducer, { reducer as formReducer } from 'redux-form'
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import appReducer from "./app-reducer";
// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth:authReducer,
    form:formReducer,
    app:appReducer
});
// export type IGlobalState = ReturnType<typeof reducers>;

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store:Store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

export let store: Store = createStore(reducers,applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;
// @ts-ignore

export type AppStateType = ReturnType<typeof reducers>

export default store;

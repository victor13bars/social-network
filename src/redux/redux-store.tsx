import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import { reducer as formReducer } from 'redux-form'
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';



let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth:authReducer,
    form:formReducer
});
// export type IGlobalState = ReturnType<typeof reducers>;

export let store: Store = createStore(reducers,applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;
// @ts-ignore
console.log(window.store)

export type AppStateType = ReturnType<typeof reducers>


export default store;

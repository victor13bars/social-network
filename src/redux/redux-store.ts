import {Action, applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import reducer, {reducer as formReducer} from 'redux-form'
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat:chatReducer
});

export let store: Store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof rootReducer>

// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export default store;

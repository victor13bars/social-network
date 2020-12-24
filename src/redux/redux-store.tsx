import {combineReducers, createStore, Store} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
});
// export type IGlobalState = ReturnType<typeof reducers>;

export let store: Store = createStore(reducers);
// @ts-ignore
window.store = store;
// @ts-ignore
console.log(window.store)

export type AppStateType = ReturnType<typeof reducers>


export default store;
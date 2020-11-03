import {combineReducers, createStore, Store} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let reducers = combineReducers({
    profileReducer,
    dialogsReducer,
    sidebarReducer
});

let store: Store = createStore(reducers);


export default store;
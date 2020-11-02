import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {
    AddPostActionType, MessagesPagesType,
    ProfilePageType,
    SendMessageActionType,
    UpdateNewMessageBodyActionType,
    UpdateNewPostTextActionType
} from "./store";

export type reducerType = {
    profileReducer: (state: ProfilePageType, action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => void,
    dialogsReducer: (state: MessagesPagesType, action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) =>void,
    sidebarReducer: () => void

}

let reducers = combineReducers({
    profileReducer,
    dialogsReducer,
    sidebarReducer
});

let store = createStore(reducers);


export default store;
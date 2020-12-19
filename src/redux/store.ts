import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

// export type PostType = {
//     id: number
//     message: string
//     likeCount: number
// }
// export type ProfilePageType = {
//     posts: Array<PostType>
//     messageForNewPost: string
// }
//
// export type DialogType = {
//     id: number
//     name: string
// }
// export type MessageType = {
//     id: number
//     message: string
// }
// export type MessagesPagesType = {
//     dialogs: Array<DialogType>
//     messages: Array<MessageType>
//     newMessageBody: string
// }
//
// export type StateType = {
//     profilePage: ProfilePageType
//     dialogsPage: MessagesPagesType
//     sidebar: SidebarType
// }
// export type SidebarType = {}
// export type ActionType = {
//     action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType
// }
// export type StoreType = {
//     _state: StateType
//     _callSubscriber: () => void
//     subscribe: (observer: () => void) => void
//     getState: () => StateType
//     dispatch: (action: AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType) => void
// }
//
// export type AddPostActionType = {
//     type: "ADD-POST"
// }
// export type UpdateNewPostTextActionType = {
//     type: "UPDATE-NEW-POST-TEXT"
//     newText: string
// }
// export type UpdateNewMessageBodyActionType = {
//     type: "UPDATE-NEW-MESSAGE-BODY"
//     body: string
// }
// export type SendMessageActionType = {
//     type: "SEND-MESSAGE"
// }
//
// let store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: "Hello", likeCount: 12},
//                 {id: 2, message: "How are you?", likeCount: 25},
//             ],
//             messageForNewPost: ""
//         },
//         dialogsPage: {
//             dialogs: [
//                 {id: 1, name: "Victor"},
//                 {id: 2, name: "Valera"},
//                 {id: 3, name: "Veronika"},
//                 {id: 4, name: "Alex"},
//                 {id: 5, name: "Dima"},
//                 {id: 6, name: "Toxa"}
//             ],
//             messages: [
//                 {id: 1, message: "Hello"},
//                 {id: 2, message: "How are you?"},
//                 {id: 3, message: "kikii"},
//                 {id: 4, message: "Alex"},
//                 {id: 5, message: "Dima"},
//                 {id: 6, message: "Toxa"}
//             ],
//             newMessageBody: ""
//         },
//         sidebar: {}
//
//     },
//     getState() {
//         return this._state;
//     },
//     _callSubscriber() {
//         console.log("State change");
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._callSubscriber();
//     }
// };
//
// export default store;

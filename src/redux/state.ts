const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export type PostType = {
    id: number
    message: string
    likeCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    messageForNewPost: string
}

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type MessagesPagesType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: MessagesPagesType
    sidebar: SidebarType
}

export type SidebarType = {}

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => StateType
    dispatch: (action: AddPostActionType | UpdateNewPostTextActionType) => void
}

export type AddPostActionType = {
    type: "ADD-POST"
}
export type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
}

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hello", likeCount: 12},
                {id: 2, message: "How are you?", likeCount: 25},
            ],
            messageForNewPost: ""
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Victor"},
                {id: 2, name: "Valera"},
                {id: 3, name: "Veronika"},
                {id: 4, name: "Alex"},
                {id: 5, name: "Dima"},
                {id: 6, name: "Toxa"}
            ],
            messages: [
                {id: 1, message: "Hello"},
                {id: 2, message: "How are you?"},
                {id: 3, message: "kikii"},
                {id: 4, message: "Alex"},
                {id: 5, message: "Dima"},
                {id: 6, message: "Toxa"}
            ]
        },
        sidebar: {}

    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log("State change");
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        if (action.type === "ADD-POST") {
            const newPost: PostType = {id: 5, message: this._state.profilePage.messageForNewPost, likeCount: 0};
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.messageForNewPost = "";
            this._callSubscriber();
        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.messageForNewPost = action.newText;
            this._callSubscriber();
        }
    }
};

export const addPostActionCreator = ():AddPostActionType => {
    return {
        type:ADD_POST
    }
}
export const updateNewPostTextActionCreator = (newText:string):UpdateNewPostTextActionType => {
    return {
        type: UPDATE_NEW_POST_TEXT, newText: newText
    }
}

export default store;

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
    updateNewPostText: (newText: string) => void
    addPost: () => void
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => StateType
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
    addPost() {
        const newPost: PostType = {id: 5, message: this._state.profilePage.messageForNewPost, likeCount: 0};
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.messageForNewPost = "";
        this._callSubscriber();
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.messageForNewPost = newText;
        this._callSubscriber();
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    }
}

export default store;

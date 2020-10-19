let rerenderEntireTree = () => {
    console.log("State change");
}

export type SidebarType = {}

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}

export type PostType = {
    id: number
    message: string
    likeCount: number
}


export type ProfilePageType = {
    posts: Array<PostType>
    messageForNewPost: string
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

export let state: StateType = {
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

}

export const addPost = () => {
    const newPost: PostType = {id: 5, message: state.profilePage.messageForNewPost, likeCount: 0};
    state.profilePage.posts.push(newPost);
    state.profilePage.messageForNewPost = "";
    rerenderEntireTree();
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.messageForNewPost = newText;
    rerenderEntireTree();
}

export const subscribe = (observer: () => void) => {
    rerenderEntireTree = observer;
}

export default state;
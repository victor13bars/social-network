import profileReducer, {addPostAC, deletePostAC} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: "Hello", likeCount: 12},
        {id: 2, message: "How are you?", likeCount: 25},
    ],
    profile: null,
    status: "123"
}

test('length of posts should be incremented', () => {

    let action = addPostAC("ТЫ МОЛОДЕЦ")
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
});


test('message of new post should be correct', () => {

    let action = addPostAC("ТЫ МОЛОДЕЦ")
    let newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe("ТЫ МОЛОДЕЦ")
});

test('after deleting length of message should be decremented', () => {

    let action = deletePostAC(1)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
});
import usersReducer, {actions, UserInitialStateType} from "./users-reducer";

let state: UserInitialStateType
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: "Victor 0", followed: false, status: "status 0",
                photos: {small: null, large: null}, location: {city: "", country: ""}
            },
            {
                id: 1, name: "Victor 1", followed: false, status: "status 1",
                photos: {small: null, large: null}, location: {city: "", country: ""}
            },
            {
                id: 2, name: "Victor 2", followed: true, status: "status 2",
                photos: {small: null, large: null}, location: {city: "", country: ""}
            },
            {
                id: 3, name: "Victor 3", followed: true, status: "status 3",
                photos: {small: null, large: null}, location: {city: "", country: ""}
            },
        ],
        pageSize: 5,
        totalItemsCount: 0,
        currentPage: 1,
        portionSize: 10,
        isFetching: true,
        followingInProgress: []
    }
})

test('followSuccess', () => {

    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('UnFollowSuccess', () => {

    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})
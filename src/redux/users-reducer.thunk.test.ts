import {actions, followTC, unfollowTC} from "./users-reducer";
import {usersAPI} from "../api/user-api";
import {APIResponseType, ResultCodeEnum} from "../api/api";

jest.mock("../api/user-api")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
})
const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result));
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test("success follow thunk", async () => {

    const thunk = followTC(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 1))
})

test("success unfollow thunk", async () => {

    const thunk = unfollowTC(1);
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 1))
})
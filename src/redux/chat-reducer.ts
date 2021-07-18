import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {chatAPI, ChatMessageResponseType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from "uuid"


let initialState = {
    messages: [] as Array<ChatMessageType>,
    status: 'pending' as StatusType
}
export type ChatMessageType = ChatMessageResponseType & { id: string }
export type AuthInitialStateType = typeof initialState
export type AuthActonType = InferActionsType<typeof actions>
export type ThunkType = BaseThunkType<AuthActonType | FormAction>
export type StatusType = 'pending' | 'ready' | 'error';

export const chatReducer = (state = initialState, action: AuthActonType): AuthInitialStateType => {
    switch (action.type) {
        case 'SET_MESSAGE_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
            }
            // return {
            //     ...state,
            //     messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
            //         .filter((m, index, array) => index >= array.length - 50)
            // }
        case 'SET_STATUS':
            return {
                ...state, status: action.status
            }
        default:
            return state;
    }
}

const actions = {
    messageReceived: (messages: Array<ChatMessageResponseType>) => ({
        type: 'SET_MESSAGE_RECEIVED',
        payload: {messages}
    } as const),
    setStatus: (status: StatusType) => ({
        type: 'SET_STATUS',
        status
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageResponseType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messageReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.setStatus(status))
        }
    }
    return _statusChangedHandler
}
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}
export default chatReducer;
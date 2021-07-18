import {StatusType} from "../redux/chat-reducer";

export type ChatMessageResponseType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type MessageReceivedSubscriberType = (messages: Array<ChatMessageResponseType>) => void
type StatusChangedSubscriberType = (status: StatusType) => void
type EventsNamesType = 'messages-received' | 'status-changed'

let subscribers = {
    'messages-received': [] as MessageReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let wsChanel: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}

const cleanup = () => {
    wsChanel?.removeEventListener('close', closeHandler)
    wsChanel?.removeEventListener('message', messageHandler)
    wsChanel?.removeEventListener('open', openHandler)
    wsChanel?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanup()
    wsChanel?.close()
    wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    wsChanel?.addEventListener('close', closeHandler)
    wsChanel?.addEventListener('message', messageHandler)
    wsChanel?.addEventListener('open', openHandler)
    wsChanel?.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanup()
        wsChanel?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        wsChanel?.send(message)
    }
}
export type ChatMessageResponseType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type SubscriberType = (messages: Array<ChatMessageResponseType>) => void

let subscribers = [] as Array<SubscriberType>

let wsChanel: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChannel() {
    wsChanel?.removeEventListener('close', closeHandler)
    wsChanel?.close()
    wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    wsChanel?.addEventListener('close', closeHandler)
    wsChanel?.addEventListener('message', messageHandler)
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers = []
        wsChanel?.removeEventListener('close', closeHandler)
        wsChanel?.removeEventListener('message', messageHandler)
        wsChanel?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        wsChanel?.send(message)
    }
}
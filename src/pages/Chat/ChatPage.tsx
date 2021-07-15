import React, {useEffect, useState} from "react";

export type ChatMessageResponseType = {
    message: string
    photo: string
    userId: number
    userName: string
}
const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        let wsChanel: WebSocket
        const closeHandler = () => {
            console.log("CLOSEE wsChanel")
            setTimeout(createChannel, 3000)
        }

        function createChannel() {

            wsChanel?.removeEventListener('close', closeHandler)
            wsChanel?.close()

            wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            wsChanel?.addEventListener('close', closeHandler)
            setWs(wsChanel)
        }

        createChannel()
        return () => {
            wsChanel.removeEventListener('close', closeHandler)
            wsChanel.close()
        }
    }, [])

    return <div>
        <Messages ws={ws}/>
        <AddMessageForm ws={ws}/>
    </div>
}

const Messages: React.FC<{ ws: WebSocket | null }> = ({ws}) => {
    const [messages, setMessages] = useState<Array<ChatMessageResponseType>>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessage) => [...prevMessage, ...newMessages])
            console.log(JSON.parse(e.data))
        }
        ws?.addEventListener('message', messageHandler)
        return () => {
            ws?.removeEventListener('message', messageHandler)
        }
    }, [ws])

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const Message: React.FC<{ message: ChatMessageResponseType }> = ({message}) => {
    return <div>
        <img src={message.photo}/>
        <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ws}) => {
    const [text, setText] = useState<string>("")
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        ws?.addEventListener('open', openHandler)

        return () => {
            ws?.removeEventListener('open', openHandler)
        }
    }, [ws])

    const sendMessage = () => {
        if (!text) {
            return
        }
        ws?.send(text)
        setText("")
    }
    return <div>
        <div>
            <textarea value={text}
                      onChange={(e) => setText(e.currentTarget.value)}>
            </textarea>
        </div>
        <div>
            <button disabled={ws === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
        </div>
    </div>
}

export default ChatPage
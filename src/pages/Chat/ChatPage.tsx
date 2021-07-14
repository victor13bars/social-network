import React, {useEffect, useState} from "react";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

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
    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<Array<ChatMessageResponseType>>([])

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessage) => [...prevMessage, ...newMessages])
            console.log(JSON.parse(e.data))
        })
    },[])

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

const AddMessageForm: React.FC = () => {
    const [text, setText] = useState<string>("")

    const sendMessage = () => {
        if (!text) {
            return
        }
        ws.send(text)
        setText("")
    }
    return <div>
        <div>
            <textarea value={text}
                      onChange={(e) => setText(e.currentTarget.value)}>
            </textarea>
        </div>
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
}

export default ChatPage
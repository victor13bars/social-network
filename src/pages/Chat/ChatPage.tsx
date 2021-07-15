import React, {useEffect, useState} from "react";
import {ChatMessageResponseType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";


const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {

    const messages = useSelector<AppStateType,Array<ChatMessageResponseType>>(state => state.chat.messages)

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
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!text) {
            return
        }

        dispatch(sendMessage(text))
        setText("")
    }
    return <div>
        <div>
            <textarea value={text}
                      onChange={(e) => setText(e.currentTarget.value)}>
            </textarea>
        </div>
        <div>
            <button onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

export default ChatPage
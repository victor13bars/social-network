import React, {useEffect, useRef, useState} from "react";
import {ChatMessageResponseType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {
    ChatMessageType,
    sendMessage,
    startMessagesListening,
    StatusType,
    stopMessagesListening
} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";


const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    let status = useSelector<AppStateType, StatusType>(state => state.chat.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occured. Please refresh Page</div>}
        <>
            <Messages/>
            <AddMessageForm/>
        </>
    </div>
}

const Messages: React.FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector<AppStateType, Array<ChatMessageType>>(state => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return <div>
        <img src={message.photo}/>
        <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

const AddMessageForm: React.FC = () => {
    const [text, setText] = useState<string>("")
    let status = useSelector<AppStateType, StatusType>(state => state.chat.status)
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
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

export default ChatPage
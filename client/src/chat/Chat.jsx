import { useEffect, useState } from 'react'
import './Chat.css'

function Chat({ ownId, socket, friend }) {
    const [messages, setMessages] = useState([]);
    const [currentMsg, setCurrentMsg] = useState([]);

    const sendMessage = () => {
        if (currentMsg !== "") {
            const msgData = {
                author: ownId,
                message: currentMsg,
                to: friend
            }


            socket.emit("send_message", msgData);
            // console.log([[...messages, msgData]])
            setMessages([...messages, msgData]);
            setCurrentMsg("");
        }
    }

    useEffect(() => {
        socket.on("msg-recieved", (data) => {
            setMessages([...messages, data]);
        })
    })

    return (
        <div>
            <p>This chat is with : {friend}</p>
            <div id="msgContainer">
                <div id="msgBox">
                    {messages.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={ownId === messageContent.author ? "you" : "friend"}
                            >
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <input type="text" id="msgInput" onChange={(event) => {
                    setCurrentMsg(event.target.value)
                }}></input>
                <button id="msgSubmit" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat

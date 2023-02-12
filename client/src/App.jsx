import { useState } from 'react'
import io from "socket.io-client";
import './App.css'
import Chat from './chat/Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  const [ownId, setOwnId] = useState("");
  const [friend, setFriend] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat = () => {
    if (friend == "") {
      alert("no id given");
    }
    // otherwise call the function in socket to join connection with this socket id
    // then show chat
    else {
      socket.emit("add-user", ownId);
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      <h1>ChatbutnotGPT</h1>
      {!showChat ? (<div>
        <h2>Chat With?</h2>
        <h3>Your Id:</h3>
        <input type="text"
          id="ownId"
          onChange={(event) => {
            setOwnId(event.target.value)
          }}>
        </input>
        <br />
        <h3>Friend Id:</h3>
        <input type="text"
          id="friendId"
          onChange={(event) => {
            setFriend(event.target.value)
          }}>
        </input>
        <button id="joinBtn" onClick={joinChat}>Join</button>
      </div>) : <Chat ownId={ownId} socket={socket} friend={friend} />}

    </div>
  )
}

export default App

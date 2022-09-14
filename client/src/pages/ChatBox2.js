// importing required libraries and css 
import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'
import './App-copy.css';

const socket = io('http://localhost:4000/')

function App2() {
  // To make variables/elements for the form to fill chat and the chat display
  // To make variable for Username
  const [msg, setMsg] = useState('')
  const [chat, setChat] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Getting the chat 'msg' from server
    socket.on('msg', myData => {
      setChat([...chat, myData])
    })
  })

  const send = (e) => {
    // Send t oconsole for log of variable "msg"
    e.preventDefault();
    console.log(username, msg)
    // Emit varaible "msg" and username so it can later be shown in the browser
    socket.emit('msg', {username, msg})
    setMsg('')
    // setUsername('')
  };

  return (

    <div class="chat-window">
      <div class="chat-header">
        <p>Live Chat</p>
      </div>
      
      <div class="chat-body">
        <div class="message-container">
          <div class="message">
            <div>
              <div class="message-meta">
                {/* <p id="time">time</p>
                <p id="author">Author</p> */}
              </div>
              <div class="message-content">
                {chat.map((myData, index) => {
                  return(
                  <p key={index}><span>{myData.username}: {myData.msg}</span></p>
                  )
                })}
              </div>
            </div> 
          </div>
        </div>
      </div>

      <div class="chat-footer">
        <form onSubmit={send} className="chat">
          <input type="text" 
          required placeholder='Enter Username'
          name="username"
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}
          ></input>
          <input type="text" 
          required placeholder='Messege here...'
          name="msg"
          value={msg}
          onChange={(e) => {setMsg(e.target.value)}}
          ></input>
          <button type='submit' className="sendbutton">Send</button>
        </form>
      </div>

    </div>
  );
}

export default App2;

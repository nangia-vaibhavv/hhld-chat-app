"use client";

import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [msg, setMsg] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if(socket && msg) {
            console.log("i received a message")
            socket.emit('listeningMessage', msg)
            setMsg('');
        }
    }

    useEffect(() => {
        const newSocket = io("http://localhost:8080/");
        setSocket(newSocket);
        return () => newSocket.close()
    }, [])
  return (
    <div>
      <form onSubmit={sendMessage}>
        <input type='text' placeholder='add message' onChange={(e) => setMsg(e.target.value)}/>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            send
            </button>
      </form>
    </div>
  )
}

export default Chat

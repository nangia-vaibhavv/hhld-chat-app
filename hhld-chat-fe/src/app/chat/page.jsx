'use client'
import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { useAuthStore } from '../zustand/useAuthStore.js'
import { useUsersStore } from '../zustand/useUsersStore.js';
import axios from 'axios';
import ChatUsers from '../_components/chatUsers.jsx';
import { useChatReceiverStore }  from '../zustand/useChatReceiverStore.js'
const Chat = () => {
    const [msgs, setMsgs] = useState([]);
    const [msg, setMsg] = useState('');
    const [socket, setSocket] = useState(null);
    const { authName, updateAuthname} = useAuthStore();
    const { users, updateUsers } = useUsersStore();
    const { chatReceiver } = useChatReceiverStore();
    const getUsersData = async () => {
        const res = await axios.get('http://localhost:8081/users', {
            withCredentials: true
        });
        updateUsers(res.data.userList);
        console.log(users, "set")

    }

    useEffect(() => {
        const newSocket = io('http://localhost:8080', {
            query: {
                username: authName
            }
        });
        setSocket(newSocket);
        newSocket.on('sendToFE', (msgrecv) => {
            setMsgs(prevMsgs => [...prevMsgs, {
                text: msgrecv.msg, sentByCurrUser:
                    false
            }]);
        });

        getUsersData();
        return () => newSocket.close();
    }, [authName]);
    const sendMsg = (e) => {
        e.preventDefault();
        const msgToBeSent = {
            msg: msg,
            sender: authName,
            receiver: 'vaibhav@gmail.com'
        }
        if (socket) {
            socket.emit('listeningMessage', msgToBeSent);
            setMsgs(prevMsgs => [...prevMsgs, {
                text: msg, sentByCurrUser: true
            }]);
            setMsg('');
        }
    }
    return (
        <div className='h-screen flex'>
        <div className='w-1/5 bg-amber-300'> 
        <ChatUsers/>
        </div>
        <div>
            <h1>{authName} chat between {chatReceiver} </h1>
        </div>
        <div className='w-4/5 flex flex-col bg-amber-200'>
            <div className='msgs-container h-4/5 overflow-scroll'>
                {msgs.map((msg, index) => (
                    <div key={index} className={` m-3 ${msg.sentByCurrUser ?
                        'text-right' : 'text-left'}`}>
                        <span className={`${msg.sentByCurrUser ? 'bg-blue-200' :
                            'bg-green-200'} p-3 rounded-lg`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className='h-1/5 flex items-center justify-center'>
                <form onSubmit={sendMsg} className="w-1/2">
                    <div className="relative">
                        <input type="text"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            placeholder="Type your text here"
                            required
                            className="block w-full p-4 ps-10 text-sm text-gray-900
border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
dark:focus:border-blue-500" />
                        <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5
bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600
dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}
export default Chat
'use client';
import React , { useEffect } from 'react';
import { useUsersStore } from '../zustand/useUsersStore';
import { useChatReceiverStore } from '../zustand/useChatReceiverStore';
import { useChatMsgsStore} from '../zustand/useChatMsgsStore';
import { useAuthStore } from '../zustand/useAuthStore';
import axios from 'axios'
const ChatUsers = () => {
    const { users } = useUsersStore();
    const { chatReceiver, updateChatReceiver} = useChatReceiverStore()
    const { updateChatMsgs } = useChatMsgsStore();
    const { authName }= useAuthStore()


    useEffect(() => {
        const getMsgs = async () => {
            const res = await axios.get(`http://localhost:8080/msg?sender=${authName}&receiver=${chatReceiver}`, {
                withCredentials: true
            });
            if(res.data.length!==0) {
                console.log("i reach", JSON.stringify(res.data))
                updateChatMsgs(res.data)
            }
            else {updateChatMsgs([]);}
        }
        
        if(chatReceiver) {
            getMsgs()
        }
    }, [chatReceiver])
   
    const setChatReceiver = (user) => {
        updateChatReceiver(user)
    }
    return (
        <div className="bg-white shadow-md rounded-xl m-4 p-4 w-72 h-full overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Friends</h2>
            {users.map((user, index) => (
                <div
                    key={index}
                    className="p-2 mb-2 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer text-gray-800"
                    onClick={()=>setChatReceiver(user.username)}
                >
                    {user.username}
                </div>
            ))}
        </div>
    );
};

export default ChatUsers;

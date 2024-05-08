import React, { useState, useEffect } from 'react';
import { getRooms } from './../../api/roomsApi';
import useAuth from '../../hooks/useAuth';
import Conversation from './Conversation';
import CurrentChat from './CurrentChat';
import CreateRoomButton from './CreateRoomButton';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast'
import Navbar from './../navbar/Navbar'

const Chat = () => {
    const { auth } = useAuth();
    const [currentChat, setCurrentChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [bothSides, setBothSides] = useState(true);
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getRooms(auth?.userInfo?._id, auth?.token)
                if (res.status === 200) setChats(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        const s = io('http://localhost:5000');
        setSocket(s);

        return () => {
          s.disconnect();
        };
    }, [auth]);

    
    useEffect(() => {
        if (!socket) return
    
        socket.on('update', async (updatedChat) => {
            const isMember = updatedChat.users.some(user => user.user === auth?.userInfo?._id)
            console.log(isMember)
            if (isMember) {
                const res = await getRooms(auth?.userInfo?._id, auth?.token)
                if (res.status === 200) setChats(res.data)
            }
        });
    
        return () => {
          socket.off('update')
        }
    }, [socket])


    useEffect(()=>{
        if(!socket) return

        socket.on('roomDeleted', async (room)=>{
            console.log(room)
            const isMember =  room.users.some(user => user.user === auth?.userInfo?._id)
            if(isMember && room._id === currentChat?._id){
                window.location.reload()
                toast.success('this chat has been removed')
                return
            }
            if (isMember && room._id !== currentChat?._id) {
                const res = await getRooms(auth?.userInfo?._id, auth?.token)
                if (res.status === 200) setChats(res.data)
                    toast.error(`"${room.name}" room got deleted by admin`)
            }
        })

        return ()=>{
            socket.off('roomDeleted')
        }
    },[socket])
    
    useEffect(()=>{
        if(!socket) return
        
        socket?.on('leftGroup', async ({room, user})=>{
            const isMember = room.users.some(user => user.user === auth?.userInfo?._id)
            if(auth?.userInfo?._id===user.user._id){
                toast.success(`you have left the group chat ${room.name}`)
                window.location.reload()
            }
            if(isMember){
                const res = await getRooms(auth?.userInfo?._id, auth?.token)
                if (res.status === 200) setChats(res.data)
                toast.success(`${user.user.userName} left ${room.name}`) 
            }
        })

        return()=>{
            socket?.off('leftGroup')
        }
    },[socket])


    const updateData = async () => {
        try {
            const res = await getRooms(auth?.userInfo?._id, auth?.token)
            if (res.status === 200) setChats(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <Navbar/>
            <div className='row m-0' >
                {/* left side */}
                <div className={`left-side chats bg-light ${bothSides ? 'd-none d-md-block col-md-3' : 'd-none '}`}>
                    <div>
                    <div className='row my-2 justify-content-between'>
                    <span className='col display-6'>chats</span>
                    <div className='col text-end'><CreateRoomButton updateData={updateData} chats={chats} setChats={setChats}/></div>
                    </div>
                    <hr className='mt-0' />
                    </div>
                    {chats.map((chat, index) => (
                        
                        <div onClick={() => setCurrentChat(chat)} key={index}>
                            <Conversation data={chat}/>
                        </div>
                    ))}
                </div>
                {/* right side */}
                <div className={`right-side display text-light bg-dark d-flex flex-column ${bothSides ? 'col-md-9' : ''}`}>
                    {
                        currentChat ? (<CurrentChat currentChat={currentChat} bothSides={bothSides} chats={chats} setChats={setChats} setBothSides={setBothSides} updateData={updateData}/>) : <></>
                    }
                </div>
            </div>
        </>
    );
};

export default Chat;

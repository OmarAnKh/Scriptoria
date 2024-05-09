import React, { useState, useEffect } from 'react';
import { getRooms } from './../../api/roomsApi';
import useAuth from '../../hooks/useAuth';
import Conversation from './Conversation';
import CurrentChat from './CurrentChat';
import CreateRoomButton from './CreateRoomButton';
import Navbar from './../navbar/Navbar'

const Chat = ({socket, chats, setChats}) => {
    const { auth } = useAuth();
    const [currentChat, setCurrentChat] = useState(null);
    const [bothSides, setBothSides] = useState(true);
    const [name, setName] = useState()
    // const [showChats, setShowChats] = useState(true)
    // const [showConversation, setShowConversation] = useState(true)
    
    useEffect(() => {
        if (!socket) return 
        socket?.on('update', async (room) => {
                const res = await getRooms(auth?.userInfo?._id, auth?.token)
            if (res.status === 200) setChats(res.data)
            if (currentChat?._id === room._id) setName(room.name)
        });
        return () => {
            socket?.off('update')
        }
    }, [socket])
    
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
            <div className='row m-0' style={{height : '89vh'}}>
                {/* left side */}
                
                {
                    <div className={`left-side chats bg-white ${bothSides ? 'd-none d-md-block col-md-3' : 'd-none '}`} style={{ maxHeight: '89vh', overflowY : 'scroll'}}>
                    <div>
                    <div className='row my-2 justify-content-between'>
                    <span className='col display-6'>chats</span>
                    <div className='col text-end'><CreateRoomButton socket={socket} updateData={updateData} chats={chats} setChats={setChats}/></div>
                    </div>
                    <hr className='mt-0' />
                    </div>
                    {chats.map((chat, index) => (
                        
                        <div onClick={() => {
                            setName(chat.name)
                            // setShowConversation(true)
                            setCurrentChat(chat)}
                        } key={index}>
                            <Conversation data={chat}/>
                            {/* <hr/> */}
                        </div>
                    ))}
                </div>
                }
                
                
                {/* right side */}
                <div className={`right-side display text-light bg-dark d-flex flex-column ${bothSides ? 'col-md-9' : ''}`}>
                    {
                        currentChat ? (<CurrentChat name={name} setName={setName} socket={socket} currentChat={currentChat} bothSides={bothSides} chats={chats} setChats={setChats} setBothSides={setBothSides} updateData={updateData}/>) : <></>
                    }
                </div>
                
                
            </div>
        </>
    );
};

export default Chat;

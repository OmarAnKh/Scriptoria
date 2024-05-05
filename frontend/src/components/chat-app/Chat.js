import React, { useState, useEffect } from 'react';
import { getRooms } from './../../api/roomsApi';
import useAuth from '../../hooks/useAuth';
import Conversation from './Conversation';
import CurrentChat from './CurrentChat';

const Chat = () => {
    const { auth } = useAuth();
    const [currentChat, setCurrentChat] = useState(null);
    const [chats, setChats] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getRooms(auth?.userInfo?._id, auth?.token);
                if (res.status === 200) setChats(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [auth]);


    return (
        <>
            <div className='row m-0' style={{ height: '100vh' }}>
                {/* left side */}
                <div className='left-side chats col-md-3 d-none d-md-block bg-light'>
                    <span className='display-4'>chats</span>
                    <hr />
                    {chats.map((chat, index) => (
                        <div onClick={() => setCurrentChat(chat)} key={index}>
                            <Conversation data={chat}/>
                        </div>
                    ))}
                </div>
                {/* right side */}
                <div className='right-side display text-light bg-dark col-md-9 d-flex flex-column'>
                    {
                        currentChat ? (<CurrentChat currentChat={currentChat}/>) : <></>
                    }
                </div>
            </div>
        </>
    );
};

export default Chat;

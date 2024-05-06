import React, { useState, useEffect } from 'react';
import { getRooms } from './../../api/roomsApi';
import useAuth from '../../hooks/useAuth';
import Conversation from './Conversation';
import CurrentChat from './CurrentChat';
import CreateRoomButton from './CreateRoomButton';
import { getFriends } from '../../api/accountApi';

const Chat = () => {
    const { auth } = useAuth();
    const [currentChat, setCurrentChat] = useState(null);
    const [friends, setFriends] = useState([])
    const [chats, setChats] = useState([]);
    const [bothSides, setBothSides] = useState(true)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getRooms(auth?.userInfo?._id, auth?.token);
                if (res.status === 200) setChats(res.data);
                const friendsRes = await getFriends(auth?.userInfo?._id)
                if(friendsRes.message!== false) setFriends(friendsRes.firends)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        console.log(friends)
    }, [auth]);

    return (
        <>
            <div className='row m-0' style={{ height: '100vh' }}>
                {/* left side */}
                <div className={`left-side chats bg-light ${bothSides ? 'd-none d-md-block col-md-3' : 'd-none '}`}>
                    <div className='row my-2 justify-content-between'>
                    <span className='col display-4'>chats</span>
                    <div className='col text-end'><CreateRoomButton friends={friends}/></div>
                    </div>
                    <hr className='mt-0' />
                    {chats.map((chat, index) => (
                        <div onClick={() => setCurrentChat(chat)} key={index}>
                            <Conversation data={chat}/>
                        </div>
                    ))}
                </div>
                {/* right side */}
                <div className={`right-side display text-light bg-dark d-flex flex-column ${bothSides ? 'col-md-9' : ''}`}>
                    {
                        currentChat ? (<CurrentChat currentChat={currentChat} bothSides={bothSides} setBothSides={setBothSides}/>) : <></>
                    }
                </div>
            </div>
        </>
    );
};

export default Chat;

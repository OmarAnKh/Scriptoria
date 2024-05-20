import React, { useState, useEffect } from 'react';
import { getRooms } from './../../api/roomsApi';
import useAuth from '../../hooks/useAuth';
import Conversation from './Conversation';
import CurrentChat from './CurrentChat';
import CreateRoomButton from './CreateRoomButton';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'; 

const Chat = ({socket, chats, setChats}) => {
    const { auth } = useAuth();
    const [currentChat, setCurrentChat] = useState(null);
    const [bothSides, setBothSides] = useState(true);
    const [name, setName] = useState()
    
    useEffect(() => {
        if (!socket) return 
        
        return () => {
            socket?.off('update')
        }
    }, [socket])

    return (
        <>
            <div className='d-flex row m-0'>
                {
                    !currentChat &&
                    <div className={`left-side chats bg-white`} style={{ height: '100vh', overflowY : 'scroll'}}>
                    <div className='row'>
                    <Link to={'/'} className="ScriptoriaName text-black" data-tooltip-id="my-tooltip" data-tooltip-content='go back to hame page' data-tooltip-place='bottom'>Scriptoria</Link>
                    <Tooltip id="my-tooltip" />
                    </div>
                        <div>
                            <div className='row my-2 justify-content-between'>
                                <span className='col display-6'>chats</span>
                                <div className='col text-end'><CreateRoomButton socket={socket} chats={chats} setChats={setChats}/></div>
                            </div>
                            <hr className='mt-0' />
                        </div>
                        {chats.map((chat, index) => (
                            <div onClick={() => {
                                setName(chat.name)
                                setCurrentChat(chat)}
                            } key={index}>
                                <Conversation data={chat}/>
                            </div>
                        ))}
                    </div>
                }           
                { currentChat ?  <div className={`right-side text-light bg-dark flex-grow-1 d-flex flex-column`} style={{height : '100vh'}}>
                            <CurrentChat name={name} setName={setName} socket={socket} currentChat={currentChat} setCurrentChat={setCurrentChat} bothSides={bothSides} chats={chats} setChats={setChats} setBothSides={setBothSides}/> 
                    </div> : <></>
                    }
            </div>
        </>
    );
};

export default Chat;

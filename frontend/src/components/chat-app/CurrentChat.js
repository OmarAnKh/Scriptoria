import React, { useState, useEffect } from 'react';
import Message from './Message';
import io from 'socket.io-client';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';

const CurrentChat = ({ currentChat }) => {
  const { auth } = useAuth();
  const room = currentChat._id;
  const username = auth?.userName;
  const [socket, setSocket] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState(currentChat.users);

  useEffect(() => {
    const s = io("http://localhost:5000")
    setSocket(s)
    
    if (currentChat) {
        s.emit('joinRoom', currentChat._id); // Emit the 'joinRoom' event when currentChat is available
      }

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket) return;
    

    socket.on('message', (message) => {
        console.log(messages, 50)
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  const handleSubmit = () => {
    if (!text.trim() || !socket) return;
    const message = {
      owner: auth?.userInfo,
      room: currentChat._id,
      text,
      time: moment(new Date().getTime()).format('h:mm a.')
    };
    console.log(message, 10)
    socket.emit('sendMessage', message, (error) => {
      if (error) {
        return console.log(error);
      }
      setText(''); 
    });
  };
  
  

  return (
    <>
      <span className='display-4 text-light'>{currentChat?.name} &nbsp;</span>
      <hr />
      <div className='flex-grow-1'>
        {/* Render whatever you want here for the current chat */}
        {messages.map((message, index) => (
          <Message
            key={index}
            isOwner={message.owner._id === auth?.userInfo?._id}
            text={message.text}
            pfp={message.owner.profilePicture}
            time={message.time}
          />
        ))}
      </div>
      <div className='card-footer my-4 d-flex gap-2'>
      <input
        name='message-input'
        id='message-input'
        type='text'
        placeholder='Write a message'
        className='form-control'
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
        <button className='btn btn-primary' onClick={handleSubmit}>
          send
        </button>
      </div>
    </>
  );
};

export default CurrentChat;

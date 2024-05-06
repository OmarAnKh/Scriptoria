import React, { useState, useEffect } from 'react';
import Message from './Message';
import io from 'socket.io-client';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';

const CurrentChat = ({ currentChat, bothSides ,setBothSides }) => {
  const { auth } = useAuth();
  const room = currentChat._id;
  const username = auth?.userName;
  const [socket, setSocket] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const s = io("http://localhost:5000")
    setSocket(s)
    
    if (currentChat) {
        s.emit('joinRoom', currentChat); 
        s.on('getOldMessages', (oldMessages) => {
          setMessages(oldMessages);
        });
      }
      
    return () => {
      s.disconnect()
    }
  }, [currentChat])

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('message', handleMessage);
    
    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket, currentChat]);

  const handleSubmit = () => {
    if (!text.trim() || !socket) return;
    const message = {
      owner: auth?.userInfo,
      roomId: currentChat._id,
      text,
      time: moment(new Date().getTime()).format('h:mm a.')
    };
    console.log(message, 10)
    socket.emit('sendMessage', message, (error) => {
      if (error) {
        return console.log(error);
      } 
    });
    setText('');
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  };

  return (
    <>
      <div>
      <span className='display-4 text-light'><a className={bothSides? 'bi bi-arrow-left-short' : 'bi bi-arrow-right-short'} onClick={()=>setBothSides(!bothSides)}></a> {currentChat?.name} &nbsp;</span>
      <hr />
      </div>
      <div className='flex-grow-1'>

        {messages.map((message, index) => (
          <Message
            key={index}
            owner={message.owner}
            text={message.text}
            pfp={message.owner.profilePicture}
            time={message.time}
          />
        ))}
      </div>
      <div className='card-footer my-4 d-flex gap-2 '>
        <input
          name='message-input'
          id='message-input'
          type='text'
          placeholder='Write a message'
          className='form-control'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className='btn btn-primary' onClick={handleSubmit}>
          Send
        </button>
      </div>
    </>
  );
};

export default CurrentChat;

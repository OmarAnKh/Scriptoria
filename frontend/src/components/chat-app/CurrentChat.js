import React, { useState, useEffect } from 'react';
import Message from './Message';
import io from 'socket.io-client';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import ChatInfo from './ChatInfo';

const CurrentChat = ({ currentChat, bothSides ,setBothSides, updateData }) => {
  const { auth } = useAuth();
  const [socket, setSocket] = useState(null);
  const [text, setText] = useState('');
  const [name, setName] = useState(currentChat.name!=='' ? currentChat.name : users[0].user.userName)
  const [messages, setMessages] = useState([]);
  const users = currentChat.users.filter(user => user.user._id !== auth?.userInfo?._id)
  // const name = currentChat.name!=='' ? currentChat.name : users[0].user.userName

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
      <div className='row my-2'>
      <div className='col-6'><span className='display-6 text-light'><a className={bothSides? 'bi bi-arrow-left-short' : 'bi bi-arrow-right-short'} onClick={()=>setBothSides(!bothSides)}></a> {name} &nbsp;</span></div>
      <div className='col-6 text-end'><ChatInfo chat={currentChat} name={name} setName={setName} updateData={updateData}/></div>
      </div>
      <hr className='mt-0' />
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
          send
        </button>
      </div>
    </>
  );
};

export default CurrentChat;

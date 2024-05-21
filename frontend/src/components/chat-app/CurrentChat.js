import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import ChatInfo from './ChatInfo';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CurrentChat = ({ socket  ,currentChat, setCurrentChat}) => {
  const { auth } = useAuth();
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const users = currentChat?.users?.filter(user => user.user._id !== auth?.userInfo?._id)
  const [name, setName] =useState(currentChat.name!=='' ? currentChat.name : users[0].user.userName)

  useEffect(() => {
    setMessages([])
    if (currentChat) {
      socket.emit('joinRoom', currentChat)
      socket.on('getOldMessages', (oldMessages) => {
        setMessages(oldMessages)
      });
    }
  }, [currentChat._id])

  useEffect(() => {
    if (currentChat) {
      const users = currentChat.users.filter(user => user.user._id !== auth?.userInfo?._id)
      setName(currentChat.name !== '' ? currentChat.name : users[0].user.userName)
    }
  }, [currentChat.name, currentChat.users, auth])

  const autoScroll = () => {
    const { current: messagesEnd } = messagesEndRef;
    if (messagesEnd) {
        const { scrollHeight, clientHeight, scrollTop } = messagesEnd.parentElement;
        const isScrolledNearBottom = scrollHeight - clientHeight - scrollTop < 100;
        if (isScrolledNearBottom) {
            messagesEnd.scrollIntoView({ behavior: "smooth", block: 'end' });
        } else if (scrollTop + clientHeight >= scrollHeight) {
            messagesEnd.scrollIntoView({ behavior: "smooth", block: 'end' });
        }
    }
};

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message) => {
      if(currentChat._id===message.roomId){
      setMessages((prevMessages) => [...prevMessages, message])
      autoScroll()
    }
    };

    socket.on('message', handleMessage);
    
    return () => {
      socket.off('message');
    };
  }, [socket, currentChat])

  const handleSubmit = () => {
    if (!text.trim() || !socket) return;
    const message = {
      owner: auth?.userInfo,
      roomId: currentChat?._id,
      roomName : currentChat.name,
      text,
      time: moment(new Date().getTime()).format('h:mm a.')
    };
    socket.emit('sendMessage', message, (error) => {
      if (error) {
        return console.log(error)
      } 
    });
    
    setText('');
  };


  useEffect(()=>{
    if(auth?.userName){
      socket.on('sendNotification', (message)=>{
        if((window.location.pathname==='/chats' && currentChat?._id !== message.roomId) || (window.location.pathname==='/chats' && !currentChat?._id))
          {toast((t) => (
            <div className='container notification p-1 pb-0 gap-2 d-flex flex-row'>
              <div className='p-0 m-0'>
                <img width="45" className='rounded-circle border border-1 img-fluid object-fit-cover rounded-5' alt="img" src={`data:image/png;base64,${message?.owner?.profilePicture}`} />
              </div>
              <div className='d-flex flex-column'>
                <div className='notification-name mb-0 pb-0'>
                    {message?.owner?.userName} {message.roomName === '' ? '' : `to '${message.roomName}'`}
                </div>
                <div className='text-break mt-0 pt-0 notification-message'>
                    {message.text.length > 30 ? (`${message.text.substring(0, 30)}...`) : (message.text)}
                </div>

              </div>
              <button class="button-X mt-2 my-0 py-0" data-text="Awesome" onClick={() => toast.dismiss(t.id)}>
                <pre class="actual-text my-0 py-1"> &#10005; </pre >
                <pre aria-hidden="true" class="hover-text my-0 py-1"> &#10005; </pre >
              </button>
            </div>          
          ));     }
      })
    }

    return()=>{
      socket?.off('sendNotification')
    }
  },[socket])

  
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
      <div className='col-6'><span className='display-6 text-light'>
        <Link className='bi bi-arrow-left-short'
      onClick={()=>{
      setCurrentChat(null)
      }}
      style={{cursor : 'pointer'}}></Link> 
      {name} &nbsp;</span></div>
      <div className='col-6 text-end'><ChatInfo chat={currentChat} setCurrentChat={setCurrentChat} socket={socket}  name={name} setName={setName}/></div>
      </div>
      <hr className='mt-0' />
      </div>
      <div className='flex-grow-1 messages-div' style={{ overflowY : 'scroll'}} ref={messagesEndRef}>
      {messages?.map((message, index) => (
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
          onChange={(e) => {
            setText(e.target.value)}}
          onKeyPress={handleKeyPress}
        />
        <button className='btn btn-primary bi bi-send' onClick={handleSubmit}>
        </button>
      </div>
    </>
  );
};

export default CurrentChat;

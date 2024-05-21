import React, { useEffect, useState } from 'react'
import { deleteRoom, updateRoom } from '../../api/roomsApi'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import defaultPhoto from './../../img/group-chat.webp'
import { getRooms } from './../../api/roomsApi';
import { useTranslation } from 'react-i18next'

const ChatInfo = ({ chat, setCurrentChat, socket ,name, setName}) => {
  const { auth } = useAuth()
  const { t } = useTranslation()
  const [edit, setEdit] = useState(false)
  const [newName, setNewName] = useState(name)
  const [users, setUsers] = useState(chat?.users?.filter(user => user.user._id !== auth?.userInfo?._id))
  const currentUser = chat?.users?.find(user => user.user._id === auth?.userInfo?._id)
  const canEdit = chat?.users?.length !== 2 || (chat?.users?.length === 2 && ((chat?.users[0]?.admin && !chat?.users[1]?.admin) || (!chat?.users[0]?.admin && chat?.users[1].admin)));
  const photo = !canEdit && users[0]?.user?.profilePicture ? `data:image/png;base64,${users[0]?.user?.profilePicture}` : defaultPhoto

  useEffect(() => {
    setNewName(name)
  }, [name])

  useEffect(() => {
    setUsers(chat.users.filter(user => user.user._id !== auth?.userInfo?._id))
  }, [chat.users, auth?.userInfo?._id])
  
  
  useEffect(()=>{
    if(!socket) return

    socket?.on('roomDeleted', async (room)=>{
      toast(`'${room.name}' got deleted`, {
        icon: '😞',
      });
        if(room._id === chat?._id){
            setCurrentChat(null)
            document.getElementById("chat-info-popup").click()
            return
        }
    })
    return ()=>{
        socket?.off('roomDeleted')
    }
},[socket])

useEffect(()=>{
  if(!socket) return
  
  socket?.on('leftGroup', async ({room, user, type})=>{
    setUsers(prevUsers => prevUsers.filter(u => u.user._id !== user.user._id))
      if(auth?.userInfo?._id===user.user._id){
        if(type==="leave") {
          toast(`you've left the group chat '${room.name}'`, {
            icon: '😊',
          });
        } else if (type==="kick"){
          toast(`lmao, you've been kicked out of '${room.name}'`, {
            icon: '💀',
          });
        }
        if(window.location.pathname === '/chats' && chat._id===room._id){
          setCurrentChat(null)
          document.getElementById("chat-info-popup").click()
        }
          return
      } else{
        if(type==="leave") {
          toast(`'${user.user.displayName}' left '${room.name}'`, {
            icon: '😓',
          });
        } else if (type === "kick") {
          toast(`lmao, '${user.user.displayName}' was kicked out of '${room.name}'`, {
            icon: '💀',
          });
        }
      }         
  },[socket])

  return()=>{
      socket?.off('leftGroup')
  }
},[socket])
  

  const deleteChat = async () => {
    try {
      const res = await deleteRoom(chat._id, auth?.token)
      if (res.status === 200) {
        socket.emit('deleteRoom', res.data);
      }
    } catch (error) {
      console.log(error)
      toast.error('error occured')
    }
  }

  const leaveChat = async (userId, type) => {
  
    const user = chat.users.find((user) => user.user._id === userId)
    const updatedUsers = chat.users.filter((user) => user.user._id !== userId)
    setUsers(updatedUsers.filter((user)=>user.user._id !== auth?.userInfo?._id));
    if (currentUser.admin && updatedUsers.length > 0 && !updatedUsers.some((user) => user.admin)) {
      updatedUsers[0].admin = true;
    }
      const room = {
        id: chat._id,
        name: chat.name,
        users: updatedUsers.map((user) => ({
          user: user.user._id,
          admin: user.admin,
        })),
      }
  
    try {
      const res = await updateRoom(room, auth?.token)    
      if (res.status === 200) {
        socket.emit('leaveGroup', { room: res.data, user, type })
        setUsers(updatedUsers.filter((user)=>user.user._id!==auth?.user._id))
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  const editRoomName = async () => {
    setEdit(false)
    let users = chat.users.map((user) => ({ user: user.user._id, admin: user.admin }))
    const room = {
      id: chat._id,
      name: newName,
      users: users,
    }
    try {
      const res = await updateRoom(room, auth?.token)
      if (res.status === 200) {
        socket.emit('updateChats', res.data)
        setName(newName)
        return toast.success('done')
      }
    } catch (error) {
      console.log(error)
      return toast.error('error occured')
    }
  }
 

  return (
    <div>

      <span className='display-6 text-light' data-bs-toggle="modal" data-bs-target="#chatInfo" title='chat info'><Link className='bi bi-info-circle-fill' ></Link></span>
      <Tooltip id="my-tooltip" />
      <div className="modal fade" id="chatInfo" tabIndex={-1} aria-labelledby="chatInfoModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header  text-dark">
              <h1 className="modal-title fs-5 text-dark" id="chatInfoModal">{t("Chats.chat-info")}</h1>
              <button type="button" id="chat-info-popup" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEdit(false)} />
            </div>
            <div className="modal-body text-dark text-start">
              <div className='text-center p-2 bg-light rounded-4'>
                {
                  canEdit ? <div className='d-flex justify-content-end flex-row'>{edit ? <Link className='bi bi-floppy-fill p-0 text-primary' title='edit name' onClick={() => setEdit(false)}></Link> : <a className='bi bi-pencil-square px-0 text-primary' title='edit name' onClick={() => setEdit(true)} style={{ cursor: 'pointer' }}></a> }</div> : <></>
                }
                <div><img className='rounded-circle m-2' src={photo} width='100'></img></div>
                <div className='row h6 bg-light text-center'>
                  {
                    edit ? <div className='my-2'>
                      <div className='text-start'>{t("Chats.edit-name")}</div>
                      <input className='form-control h4 col m-0' value={newName} onChange={(e) => setNewName(e.target.value)} />
                      <div className='btn-group my-2'><button className='btn btn-primary' onClick={editRoomName}>{t("Chats.save")}</button><button className='btn btn-secondary' onClick={() => setEdit(false)}>{t("Chats.cancel")}</button></div>
                    </div> : <div className='h4'>{newName}</div>
                  }
                </div>
              </div>


              <div className='members p-2'>
                <div className='position-sticky row'>
                  <div className='col'><span className='fw-bold h4 p-2 col'>{t("Chats.members")}</span></div>
                  </div>
                <hr className='m-1' />
                <div className='container text-start bg-light rounded-2'>
                  <div className='row  p-1 my-2'>
                    <div className='username col'><Link className='text-decoration-none text-dark' to={`/profile/${currentUser?.user?.userName}`}>{currentUser?.user?.userName} {currentUser?.admin ? <>({t("Chats.me")}, {t("Chats.admin")})</> : <>({t("Chats.me")})</>}</Link></div>
                  </div>
                  {users.map((user, index) => {
                return (
                  <div className='row p-2 my-3' key={index}>
                    <div className='username col-8'><Link className='text-decoration-none text-dark' to={`/profile/${user?.user?.userName}`}>{user?.user?.userName}</Link> {user?.admin ? <>({t("Chats.admin")})</> : <></>}</div>
                    {
                      currentUser.admin ? (
                        <div className='btns btn-group-sm btn-group text-end col'>
                          <button className='btn btn-danger bi bi-person-dash-fill' data-tooltip-id="my-tooltip" data-tooltip-content="kick" data-tooltip-place="bottom" onClick={() => leaveChat(user.user._id, "kick")}></button>
                        </div>
                      ) : (
                        <></>
                      )
                    }
                  </div>
                );
              })
              }
                </div>
              </div>
            </div>

            <div className="modal-footer p-1">
              {
                users.length ? <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => leaveChat(auth?.userInfo?._id, "leave")}>{t("Chats.leave-group")}</button> : <></>
              }
              {currentUser?.admin ? <button type="button" className="btn btn-danger" onClick={deleteChat}>{t("Chats.delete-group")}</button> : <></>}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInfo

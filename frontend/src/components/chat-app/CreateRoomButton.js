import React, {useState, useEffect} from 'react'
import { createRoom } from '../../api/roomsApi'
import useAuth from '../../hooks/useAuth'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { toast } from 'react-hot-toast';
import { getFriends } from '../../api/accountApi';
import io from 'socket.io-client';
import './Chat.css'


const CreateRoomButton = ({updateData,chats, setChats}) => {

  
    const {auth} = useAuth()
    const animatedComponents = makeAnimated();
    const [members, setMembers] = useState([])
    const [person, setPerson] = useState(null)
    const [group, setGroup] = useState(false)
    const [friends, setFriends] = useState([])
    const [nameRequired, setNameRequired] = useState(false)
    const [membersRequired, setMembersRequired] = useState(false)
    const [personRequired, setPersonRequired] = useState(false)
    const [name, setName] = useState('')
    const [socket, setSocket] = useState(null);

    const options = friends?.map((friend)=>{
      return { value : friend._id, label : friend.userName}
    })

    useEffect(() => {
      const s = io("http://localhost:5000")
      setSocket(s)      
      return () => {
        s.disconnect()
      }
    }, [])    

    useEffect(()=>{
      const fetchData = async()=>{
        try {
          const res = await getFriends(auth?.userInfo?._id)
            if (res.message) {
                setFriends(res.friends)
            }
        } catch(error) {
          console.log(error)
        }
      }
      fetchData()
    },[])

    const handleSelectChange = (selectedMembers) => {
      const membersIds = selectedMembers.map((member) => ({ user: member.value, admin: false }));
      setMembers(membersIds);
    }

    const handleCreate = async () => {
      if (group) {
        if (name.trim() === '') {
          setNameRequired(true)
          return
        }
        if (members.length === 0) {
          setMembersRequired(true)
          return
        }
      } else {
        if (!person) {
          setPersonRequired(true)
          return
        }
      }
    
      const chat = {
        name,
        users: group
          ? [
              ...members,
              { user: auth?.userInfo?._id, admin: true }
            ]
          : [
              { user: auth?.userInfo?._id, admin: false },
              { user: person, admin: false }
            ]
      };
    
      try{
        const res = await createRoom(chat, auth?.token);
    
      if (res?.status === 200) {
        setNameRequired(false)
        setMembersRequired(false)
        setPersonRequired(false)
        setName('')
        setMembers([])
        setPerson(null)
        setGroup(false) 
        socket.emit('newRoom', res.data)
        document.getElementById('closeModal').click()
        toast.success(`u have created new room ${name}`)
      }}catch(error){
        console.log(error)
        toast.error('an error occured')
      }
    }

    
  return (
    <>
     <div>
    <a className='bi bi-plus-circle-fill display-6' data-bs-toggle="modal" data-bs-target="#createRoom" ></a>
  <div className="modal fade" id="createRoom" tabIndex={-1} aria-labelledby="myModal" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="myModa">new chat</h1>
          <button type="button" className="btn-close" id="closeModal" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setGroup(false)}/>
        </div>
        <div className="modal-body text-start">
        {
          group? (<><div className='container h4 text-center'>create a group chat</div>
          <div className='from'>
          <div className='h5 my-4'>
          <label htmlFor='group-name'>group chat name</label>
          <input className='form-control mt-1 mb-2' type='text' id='group-name' required value={name} onChange={(e)=>setName(e.target.value)}></input>
          {nameRequired? <span className='text-danger'>group name is required !</span> : <></>}
          </div>
          <div className='my-4'>
            <label htmlFor='group-members'><span className='h5'>choose group members</span></label>
            <Select
            id='group-members'
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={handleSelectChange}
            />
          </div>
          {membersRequired? <span className='text-danger'>group is empty !</span> : <></>}
          <div className='text-center p-2'><a className='text-secondary text-decoration-none' onClick={()=>setGroup(false)} style={{cursor : 'pointer'}}>chat with one person only</a></div>
          </div></>) : (<><div className='container h4 text-center'>choose someone to chat with</div>
          <Select    
          components={animatedComponents}
          options={options}
          onChange={(selected)=>setPerson(selected.value)}
          />
          {personRequired? <span className='text-danger'>choose one person !</span> : <></>}
          <div className='text-center p-2'><a className='text-secondary text-decoration-none' onClick={()=>setGroup(true)} style={{cursor : 'pointer'}}>create a group chat</a></div>
  </>)
        }
        </div>
        <div className="modal-footer p-1">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">close</button>
          <button type="button" className="btn btn-primary" onClick={handleCreate}>start chating</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default CreateRoomButton
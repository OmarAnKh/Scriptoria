import React from 'react'
import useAuth from '../../hooks/useAuth'

const Conversation = ({data}) => {
    const {auth} = useAuth()
    const users = data.users.filter((user)=> user._id !== auth?.userInfo?._id)
    const photo = `data:image/png;base64,${users[0]?.profilePicture}`
  return (
    <div className='container d-flex flex-row bg-secondary p-1 my-2 rounded' style={{cursor : 'pointer'}}>
        <div className=''>
        <img
          className="rounded-circle border border-2"
          src={photo}
          alt="Profile"
          width="60"
        />
        </div>
        <div className='px-2 d-flex flex-column'>
        <div  className='h4'>
            {data.name}
        </div>
        <div className='meg-text'>
            text
        </div>
        </div>
        </div>
  )
}

export default Conversation
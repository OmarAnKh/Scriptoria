import React from 'react'
import { Tooltip } from 'react-tooltip'
import useAuth from '../../hooks/useAuth'

const Message = ({owner, text, time}) => {
  const {auth} = useAuth()
  const isOwner = owner._id === auth?.userInfo?._id
  
  return (
    <div className='row m-1 '>
      {isOwner? <></> : <div className='text-secondary text-start'>{owner.userName}</div>}
      <div className={`d-flex flex-row justify-content-${isOwner? 'end' : 'start'}`}>
        <div className={`text rounded-5  text-break p-2 bg-${isOwner? 'primary' : 'secondary'}`} data-tooltip-id="my-tooltip" data-tooltip-content={time} data-tooltip-place={isOwner? 'left' : 'right'} >
            {text}
        </div>
        <Tooltip id="my-tooltip" />
    </div>
    </div>
  )
}

export default Message
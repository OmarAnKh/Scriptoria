import React from 'react'

const Message = ({isOwner, pfp, text, time}) => {
  return (
    <div className='row d-flex flex-row'>
        {isOwner ? <></> : <img src={pfp} alt=""/>}
        <div className={`text rounded-5 bg-${isOwner? 'primary' : 'secondary'}`} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title={time}>
            {text}
        </div>
    </div>
  )
}

export default Message
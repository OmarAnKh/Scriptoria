import React from 'react'
import "./CardOfUsers.css"
import {useNavigate } from "react-router-dom";


const CardOfUsers = (props) => {
    const navigate = useNavigate()

    const GoToProfile = () => {
        navigate(`/Profile/${props.userName}`);
      }

  return (
   
<div className="card cardOfUsers" style={{width: '16rem'}}>
  <div className='ratio ratio-1x1'>
  <img src={props.images} className="card-img-top object-fit-cover" alt="..."   />
  </div>
  <div className="card-body d-flex flex-column justify-content-center align-items-center">
  <h5 className="card-text  displayName ">{props.displayName}</h5>
    <p className="card-title userName">{props.userName}</p>
    <div>
    <button  type="button" className="btn btn-primary mx-5 buttonsOfPro" onClick={GoToProfile}>Show Profile</button>
    </div>
  </div>
  
</div>
  )
}

export default CardOfUsers


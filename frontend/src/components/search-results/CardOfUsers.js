import React from 'react'
import "./CardOfUsers.css"
import {useNavigate } from "react-router-dom";


const CardOfUsers = (props) => {
    const navigate = useNavigate()

    const GoToProfile = () => {
        navigate(`/Profile/${props.userName}`);
      }

      return (
        <div className="card searchProfile">
          <div className="searchProfileImage">
            <img src={props.images} alt="Profile Image" />
          </div>
          <div className="textContainer">
            <p className="profileDisplayName">{props.displayName}</p>
            <p className="profileUserName">@{props.userName}</p>
          </div>
           <i  class="bi bi-person person-icon" onClick={GoToProfile}></i>
        </div>
      );
}

export default CardOfUsers


import React from 'react';
import { useNavigate } from 'react-router-dom';
const FriendsListBtn = (props) => {
    const navigate = useNavigate()
    const visitAccountHandler = () => {
        navigate(`/profile/${props.userName}`)
        window.location.reload();
    }
    return (
        <div className="button-container">
            <button className="button-icon " onClick={visitAccountHandler} >visit profile</button>
        </div>
    );
}

export default FriendsListBtn;

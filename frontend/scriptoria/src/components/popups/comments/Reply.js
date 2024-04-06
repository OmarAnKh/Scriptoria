import React, {useState} from 'react'
import { Link } from "react-router-dom";
import './Comments.css'

const Reply = ({ username, comment, time, likes, username2 }) => {
    const [like, setLike] = useState(false)
    const likeHandler = () =>{
      setLike(!like)
    }
  return (
    <div className="d-flex flex-row bg-light px-0 py-1 rounded">
          <div className="bd-highlight">
              <img className='rounded-circle' src="https://i.pinimg.com/280x280_RS/a4/9d/59/a49d596492909a0f96da8d900461378b.jpg" alt="Profile" width="25" />
          </div>
          <div className="px-2 text bd-highlight">
              <div className='fw-bold h6 small'>
                <Link to={`/profile/${username}`} className="profile-link" >{username}</Link> <i className="bi bi-caret-right-fill text-secondary"></i> <Link to={`/profile/${username}`} className="profile-link" >{username2}</Link></div>
              <div className='fw-normal small h6  comment-text'>{comment}</div>
              <div className="row small justify-content-between">
    <div className="col-8 col-sm-4 row"> 
        <div className="col-4 time-passed text-muted">{time}</div>
        <div className="col-4 reply-btn"><a className="reply-btn text-decoration-none text-secondary p-0">Reply</a></div>
        <div className="col-0"></div>
    </div>
    <div className="col-3 comment-like-btn text-end px-lg-5 px-s-1"><a className={`comment-like-btn text-decoration-none p-0 bi bi-heart-fill text-${ like? 'danger' : 'secondary'}`} onClick={likeHandler} ></a></div>
</div>

          </div>
      </div>
  )
}

export default Reply
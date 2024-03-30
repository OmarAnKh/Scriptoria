import React, { useState } from "react";
import Reply from "./Reply";
import "./Comments.css";

const Comment = ({ username, comment, time, likes }) => {
  const [like, setLike] = useState(false);
  const likeHandler = () => {
    setLike(!like);
  };
  return (
    <div className="d-flex flex-row bg-light p-2 rounded">
      <div className="bd-highlight">
        <img
          className="rounded-circle"
          src="https://i.pinimg.com/564x/60/5e/46/605e461ca634e868085d1a3d9d02b1ea.jpg"
          alt="Profile"
          width="35"
        />
      </div>
      <div className="px-2 text bd-highlight">
        <div className="fw-bold h6 small">{username}</div>
        <div className="fw-normal small h6  comment-text">{comment}</div>
        <div className="row small justify-content-between">
          <div className="col-8 col-sm-4 row">
            <div className="col-4 time-passed text-muted">{time}</div>
            <div className="col-4 reply-btn">
              <a className="reply-btn text-decoration-none text-secondary p-0">
                Reply
              </a>
            </div>
            <div className="col-0"></div>
          </div>
          <div className="col-3 comment-like-btn text-end px-lg-5 px-s-1">
            <a
              className={`comment-like-btn text-decoration-none p-0 bi bi-heart-fill text-${
                like ? "danger" : "secondary"
              }`}
              onClick={likeHandler}
            ></a>
          </div>
        </div>
        <Reply
              username="ahmad" 
              username2="abood"
              comment="from what yr is gen z ? Containers center and horizontally pad your content. Use .container for a responsive pixel width, .container-fluid for width: 100% across all viewports and devices, or a responsive container (e.g., .container-md) for a combination of fluid and pixel widths." 
              time="5h" 
              likes="1"
              />
      </div>
    </div>
  );
};

export default Comment;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {deleteReply, editReply} from "../../api/repliesApi";
import toast from "react-hot-toast";
import logo from "../../img/content.png";
import { useTranslation } from "react-i18next";
import "./Comments.css";
import useAuth from "../../hooks/useAuth";


const Reply = ({reply,updateComments,originId,time,likes,triggerCount,setTriggerCount,replyInfo,setReplyInfo, setReplyFlag}) => {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const token = auth?.token;
  const [commentLikes, setCommentLikes] = useState([...reply.likes])
  const [like, setLike] = useState(reply?.likes?.includes(auth?.userInfo?._id));
  const [imageUrl, setImageURL] = useState(logo);
  const [edit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState(reply.text);
  const editDelete = auth?.userInfo?._id === reply.replier._id ? true : false;

  useEffect(() => {
    setImageURL(`data:image/png;base64,${reply?.replier?.profilePicture}`);
    setEditedText(reply.text);
    setLike(reply.likes.includes(auth?.userInfo?._id))
  }, [reply.text, auth?.userInfo?._id]);


  const likeHandler = async () => {
    let updatedLikes;
    if (like) {
      updatedLikes = commentLikes.filter((person) => person !== auth?.userInfo?._id);
    } else {
      updatedLikes = [...commentLikes, auth?.userInfo?._id];
    }
  
    const editedReply = {
      ...reply,
      likes: updatedLikes
    };
  
    const res = await editReply(editedReply, token);
    if (res.status === 200) {
      setCommentLikes(updatedLikes);
      setLike(!like);
    }
  };
  


  const handleReply = async (status) => {
    try {
      if (status === 0) {
        await toast.promise(deleteReply(reply._id, token),
          {
            loading: "Deleting comment...",
            success: "Comment deleted successfully",
            error: "Failed to delete comment",
          }
        );
        setTriggerCount(!triggerCount)
      }
      if (status === 1) {
        const comment = {
          ...reply
        }
        comment.text=editedText
        await toast.promise(
          editReply(comment, token),
          {
            loading: "Editing comment...",
            success: "Comment edited successfully",
            error: "Failed to edit this comment",
          }
        );
      }
      await updateComments()
    } catch (error) {
      console.log(error);
    }
  };


  const handleCloseModal = () => {
    const modal = document.getElementById("staticBackdrop");
    if (modal) {
      const modalBackdrop = modal.querySelector(".modal-backdrop");
      modal.classList.remove("show");
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  };

  return (
    <div className="comment my-1 text-break rounded-5 d-flex flex-row bg-light p-2 w-100 rounded-2">
      <div className="bd-highlight">
        <img
          className="rounded-circle"
          src={imageUrl}
          alt="Profile"
          width="35"
        />
      </div>
      <div className="row px-2 text bd-highlight justify-content-between w-100">
        <div className="col">
          <Link
            to={`/profile/${reply?.replier?.userName}`}
            className="profile-link fw-bold"
            onClick={handleCloseModal}
          >
            {reply?.replier?.displayName}
          </Link>
          {
            reply?.repliedTo ? <>
          <i className="bi bi-caret-right-fill text-secondary mx-1"></i> 
          <Link
            to={`/profile/${reply?.repliedTo?.userName}`}
            className="profile-link fw-bold"
            onClick={handleCloseModal}
          >
            {reply?.repliedTo?.displayName}
          </Link>
            </> : <></>
          }
        </div>
        {editDelete ? (
          <div className="col text-end edit-delete-comment my-0 py-0">
            <div className="dropdown my-0 py-0">
              <Link
                className="rounded-pill py-0 my-0 bi bi-three-dots text-secondary"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></Link>
              <ul className="dropdown-menu p-0">
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    {t("Comments.edit")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-danger"
                    onClick={() => handleReply(0)}
                  >
                    {t("Comments.delete")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        {edit ? (
          <>
            <div className="row py-2">
              <textarea
                className="form-control"
                id="edit-comment"
                placeholder="write something..."
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            </div>
            <div className="container text-center">
              <div className="gap-2 btn-group btn-group-sm mb-2">
                <button
                  type="button"
                  className="btn btn-primary rounded"
                  onClick={() => {
                    handleReply(1);
                    setEdit(!edit);
                  }}
                >
                  {t("Comments.save")}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary rounded"
                  onClick={() => {
                    setEdit(!edit);
                    setEditedText(reply.text);
                  }}
                >
                  {t("Comments.cancel")}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="comment-text text-dark lh-1">{reply.text}</div>
            <div className="row w-100 text-center justify-content-between">
              <div className="col-8 col-sm-4  d-flex flex-row gap-3">
                <div className="time-passed text-muted">
                  <small>{time}</small>
                </div>
                {
                  auth?.userName ? <div className="reply-btn text-muted">
                  <Link className="text-decoration-none text-secondary"
                  onClick={()=>{
                    setReplyInfo({
                      originId ,
                      replier : auth?.userInfo?._id,
                      repliedTo : reply?.replier,
                      to : reply?.replier?.displayName
                    })
                    setReplyFlag(true)
                  }}
                  >{t("Comments.reply")}</Link>
                </div> : <></>
                }
              </div>
              <div className="col-3 px-0 mx-0 comment-like-btn text-end">
                {
                  auth?.userName ? 
                  <>
                  {commentLikes.length}
                  <Link
                  className={`mx-1 comment-like-btn text-end text-decoration-none bi ${like ? "bi-heart-fill text-danger" : "bi-heart text-secondary"}
                    `}
                  onClick={likeHandler}
                ></Link>
                  </> : <>{commentLikes.length} likes</> 
                }
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reply;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteComment, editComment } from "../../api/commentsApi";
import toast from "react-hot-toast";
import logo from "../../img/content.png";
import { useTranslation } from "react-i18next";
import "./Comments.css";
import useAuth from "../../hooks/useAuth";
import Reply from "./Reply";


const Comment = ({ storyId,
  userId,
  commentId,
  replies,
  text,
  account,
  comment,
  updateComments,
  likes,
  triggerCount,
  setTriggerCount,
  replyInfo,
  setReplyInfo,
  replyFlag, setReplyFlag
}) => {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const token = auth.token;
  const [commentLikes, setCommentLikes] = useState([...likes])
  const [like, setLike] = useState(commentLikes.includes(auth?.userInfo?._id));
  const [imageUrl, setImageURL] = useState(logo);
  const [edit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const editDelete = userId === account._id ? true : false;



  useEffect(() => {
    setImageURL(`data:image/png;base64,${account.profilePicture}`);
    setEditedText(text);
    setLike(likes.includes(auth?.userInfo?._id))
  }, [text, auth?.userInfo?._id]);


  const likeHandler = async () => {
    let updatedLikes;
    if (like) {
      updatedLikes = commentLikes.filter((person) => person !== auth?.userInfo?._id);
    } else {
      updatedLikes = [...commentLikes, auth?.userInfo?._id];
    }
  
    const comment = {
      text,
      _id: commentId,
      likes: updatedLikes,
      accountId: account._id
    };
  
    const res = await editComment(comment, token);
    if (res.statusText === "OK") {
      setCommentLikes(updatedLikes);
      setLike(!like);
    }
  };
  


  const handleComment = async (status) => {
    try {
      if (status === 0) {
        await toast.promise(deleteComment(commentId, token),
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
          text: editedText,
          _id: commentId,
          likes: likes,
          accountId: account._id
        }
        await toast.promise(
          editComment(comment, token),
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

  const getDateStringDifference = (date1, date2) => {
    var difference_ms = Math.abs(date1 - date2);
    var difference_minutes = Math.floor(difference_ms / (1000 * 60));
    var difference_hours = Math.floor(difference_ms / (1000 * 60 * 60));
    var difference_days = Math.floor(difference_ms / (1000 * 60 * 60 * 24));
    if (difference_days > 0) {
      return difference_days + "d";
    } else if (difference_hours > 0) {
      return difference_hours + "h";
    } else if (difference_minutes > 0) {
      return difference_minutes + "m";
    } else {
      return "now";
    }
  }

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
            to={`/profile/${account.userName}`}
            className="profile-link fw-bold"
            onClick={handleCloseModal}
          >
            {account.displayName}
          </Link>
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
                    onClick={() => handleComment(0)}
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
                    handleComment(1);
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
                    setEditedText(text);
                  }}
                >
                  {t("Comments.cancel")}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="comment-text text-dark lh-1">{text}</div>
            <div className="row w-100 text-center justify-content-between">
              <div className="col-8 col-sm-4  d-flex flex-row gap-3">
                <div className="time-passed text-muted">
                  <small>{getDateStringDifference(new Date(), new Date(comment.createdAt))}</small>
                </div>
                {
                  auth?.userName ? <div className="reply-btn text-muted">
                  <Link className="text-decoration-none text-secondary"
                  onClick={()=>{
                    setReplyInfo({
                      originId : commentId,
                      to : account?.displayName
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
        {
          replies?.map((reply, index)=>{
            return (
              <Reply
              reply={reply}
              key={index}
              originId={commentId}
              time={getDateStringDifference(new Date(), new Date(reply.createdAt))}
              likes={likes}
              triggerCount={triggerCount}
              setTriggerCount={setTriggerCount}
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              replyFlag={replyFlag}
              setReplyFlag = {setReplyFlag}
              updateComments={updateComments}
            />
            )
          })
        }
      </div>
    </div>
  );
};

export default Comment;

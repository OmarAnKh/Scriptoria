import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteComment, editComment } from "../../../api/commentsApi";
import toast from "react-hot-toast";
import logo from "../../../img/content.png";
import { useTranslation } from "react-i18next";
import "./Comments.css";
import useAuth from "../../../hooks/useAuth";


const Comment = ({
  userId,
  commentId,
  text,
  account,
  time,
  updateComments,
  likes,
}) => {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const token = auth.token;
  const [like, setLike] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [imageUrl, setImageURL] = useState(logo);
  const [edit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const editDelete = userId === account._id ? true : false;

  const likeHandler = () => {
    setLike(!like);
  };

  const handleComment = async (status) => {
    try {
      if (status === 0) {
        await toast.promise(
          Promise.all([
            await deleteComment(commentId, token),
            await updateComments(),
          ]),
          {
            loading: "Deleting comment...",
            success: "Comment deleted successfully",
            error: "Failed to delete comment",
          }
        );
      }

      if (status === 1) {
        await toast.promise(
          Promise.all([
            await editComment(commentId, editedText, token),
            await updateComments(),
          ]),
          {
            loading: "Editing comment...",
            success: "Comment edited successfully",
            error: "Failed to edit this comment",
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userName = auth.userName;
    userName !== undefined ? setSignedIn(true) : setSignedIn(false);
    setImageURL(`data:image/png;base64,${account.profilePicture}`);
    setEditedText(text);
  }, [text]);

  const handleCloseModal = () => {
    const modal = document.getElementById("staticBackdrop");
    if (modal) {
      const modalBackdrop = modal.querySelector(".modal-backdrop");
      modal.classList.remove("show");
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  };

  return (
    <div className="comment d-flex flex-row bg-light p-2 w-100 rounded m-0">
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
            className="fw-bold profile-link"
            onClick={handleCloseModal}
          >
            {account.displayName}
          </Link>
        </div>
        {editDelete ? (
          <div className="col text-end edit-delete-comment">
            <div className="dropdown">
              <button
                className="btn rounded-pill py-0 m-0 bi bi-three-dots"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul className="dropdown-menu p-0">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    {t("Comments.edit")}
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-danger"
                    onClick={() => handleComment(0)}
                  >
                    {t("Comments.delete")}
                  </a>
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
            <div className="fw-normal  comment-text">{text}</div>
            <div className="row  w-100 text-center justify-content-between">
              <div className="col-8 col-sm-4 row">
                <div className="col-4 time-passed text-muted">
                  <small>{time}</small>
                </div>
                {signedIn ? (
                  <div className="col-4 reply-btn">
                    <a className="reply-btn text-decoration-none text-secondary p-0">
                      <small>{t("Comments.Reply")}</small>
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-3 px-2 comment-like-btn text-end">
                <a
                  className={`comment-like-btn text-decoration-none bi bi-heart-fill text-${like ? "danger" : "secondary"
                    }`}
                  onClick={likeHandler}
                ></a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;

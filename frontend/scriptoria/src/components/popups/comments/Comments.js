import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import { getComments } from '../../../api/commentsApi'
import { findAccount } from '../../../api/accountApi'
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth'


const Comments = ({ id }) => {
  const { auth } = useAuth();
  const { t } = useTranslation()
  const [signedIn, setSignedIn] = useState(false);
  const [comments, setComments] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    const userName = auth.userName;
    const fetchData = async () => {
      const value = await getComments(id);
      if (value !== undefined) {
        setComments(value.data);
      }
      if (userName !== undefined) {
        setSignedIn(true);
        const data = await findAccount({ userName });
        if (data.message) {
          setUser(data.user);
        }
      }
    };
    fetchData();
  }, []);

  const updateComments = async () => {
    const value = await getComments(id);
    if (value !== undefined) {
      setComments(value.data);
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

  return (
    <>
      <div>
        <i className="bi bi-chat-fill" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ color: 'white', cursor: 'pointer', justifySelf: 'center', fontSize: '2rem' }}></i>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable p-0">
            <div className="modal-content">
              <div className="modal-header py-2">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">{t("Comments.Comments")}</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              {comments.length > 0 ? <div className="modal-body overflow-x-hidden p-0 m-0" style={{ height: '670px' }}>

                {
                  comments.map((comment, index) => {
                    return (
                      <Comment
                        userId={user._id}
                        key={index}
                        commentId={comment._id}
                        account={comment.accountId}
                        text={comment.text}
                        time={getDateStringDifference(new Date(), new Date(comment.createdAt))}
                        updateComments={updateComments}
                        likes={comment.likes}
                      />
                    );
                  })
                }
              </div> : <div className="d-flex justify-content-center align-items-center" style={{ height: '670px' }}>
                <div className="text-center text-secondary h6">
                  {t("Comments.no-comments")}
                </div>
              </div>
              }
              {signedIn ? <div className="modal-footer p-0">
                <AddComment signedIn={signedIn} updateComments={updateComments} storyId={id} />
              </div> : ``}
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Comments
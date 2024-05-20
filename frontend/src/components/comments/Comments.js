import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import { getComments } from '../../api/commentsApi'
import { findAccount } from '../../api/accountApi'
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth'
import {getReplies} from '../../api/repliesApi'


const Comments = ({ id, triggerCount, setTriggerCount }) => {
  const { auth } = useAuth();
  const { t } = useTranslation()
  const [signedIn, setSignedIn] = useState(false);
  const [comments, setComments] = useState([])
  const [replyFlag, setReplyFlag] = useState(false)
  const [replyInfo, setReplyInfo] = useState({})  
  const [replies, setReplies] = useState([]);
  const [commentFlag,setCommentFlag]=useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await getComments(id);
        if (res !== undefined) setComments(res.data);
      } catch(error) {
        console.log(error)
      }
    };
    fetchData();
  }, [commentFlag]);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await getReplies(id)
      if(res?.status===200) setReplies(res.data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchData()
  },[commentFlag])

  const updateComments = async () => {
    setCommentFlag(!commentFlag)
  };

  return (
    <>
      <div className='comments'>
        <i className="bi bi-chat-fill" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ color: 'white', cursor: 'pointer', justifySelf: 'center', fontSize: '2rem' }}></i>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable p-0">
            <div className="modal-content">
              <div className="modal-header py-2">
                <h2 className="modal-title fw-bold fs-5" id="staticBackdropLabel">{t("Comments.Comments")}</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              {comments.length > 0 ? <div className="modal-body overflow-x-hidden py-0 px-1 m-0" style={{ height: '670px' }}>

                {
                  comments.map((comment, index) => {
                    return (
                      <Comment
                      storyId={id}
                      replyFlag={replyFlag}
                      comment={comment}
                      setReplyFlag={setReplyFlag}
                      replies={replies.filter((reply)=> reply.originId===comment._id)}
                      userId={auth?.userInfo?._id}
                      key={index}
                      commentId={comment._id}
                      account={comment.accountId}
                      text={comment.text}
                      updateComments={updateComments}
                      likes={comment.likes}
                      triggerCount={triggerCount}
                      setTriggerCount={setTriggerCount}
                      replyInfo={replyInfo}
                      setReplyInfo={setReplyInfo}
                      />
                    );
                  })
                }
              </div> : <div className="d-flex justify-content-center align-items-center" style={{ height: '670px' }}>
                <div className="text-center text-secondary">
                  {t("Comments.no-comments")}
                </div>
              </div>
              }
              {auth?.userInfo?._id ? <div className="modal-footer p-0">
                <AddComment signedIn={signedIn} updateComments={updateComments} storyId={id} replyFlag={replyFlag} setReplyFlag={setReplyFlag} triggerCount={triggerCount} setTriggerCount={setTriggerCount} replyInfo={replyInfo} setReplyInfo={setReplyInfo}/>
              </div> : ``}
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Comments
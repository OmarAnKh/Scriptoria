import React, { useState, useEffect } from 'react'
import logo from "../../img/content.png";
import { findAccount } from '../../api/accountApi'
import { sendComment } from '../../api/commentsApi'
import { sendReply } from '../../api/repliesApi';
import { useTranslation } from 'react-i18next';
import useAuth from "../../hooks/useAuth"
import { Link } from 'react-router-dom';


const AddComment = ({ storyId, signedIn, updateComments, triggerCount, setTriggerCount, replyInfo, setReplyInfo, replyFlag, setReplyFlag }) => {
    const { auth } = useAuth();

    const { t } = useTranslation()
    const [user, setUser] = useState({})
    const [text, setText] = useState('')
    // const [imageUrl, setImageURL] = useState(logo)
    const imageUrl = `data:image/png;base64,${auth?.userInfo?.profilePicture}`



    const saveComment = async () => {
        if(text.length > 0)
        {
            if(!replyFlag){
                const comment = {
                    accountId: auth?.userInfo?._id,
                    storyId,
                    text,
                }
                try {
                    await sendComment(comment, auth?.token);
                    setText('')
                    updateComments();
                    setTriggerCount(!triggerCount);
                } catch (error) {
                    console.log(error);
                }
            } else if (replyFlag){
                const reply = {
                    storyId,
                    text,
                    replier : auth?.userInfo?._id,
                    originId : replyInfo.originId,
                    repliedTo : replyInfo.repliedTo
                }
                try{
                    const res = await sendReply(reply, auth?.token)
                    if(res.status===200){
                        setText('')
                        setReplyInfo({})
                        setReplyFlag(false)
                        updateComments();
                        setTriggerCount(!triggerCount);
                    }
                } catch(error){
                    console.log(error)
                }    
            }   
        }
    }
    return (
        <div className='bg-light p-0 mt-0 row container rounded'>
       {
        replyFlag?  <div className='d-flex'>
        <div className='container replied-to mx-3 py-2 px-4 text-secondary row'>
        <span>reply to {replyInfo.to}</span>
        </div>
        <div className='mx-5 py-1'><Link className='text-end fs-5' onClick={()=> setReplyFlag(false)}><i className="bi bi-x-circle-fill text-danger"></i></Link></div>
        </div> : <></>
       }
        <div className="d-flex flex-row bg-light w-100 rounded">
            <div className="p-1">
                <img src={imageUrl} alt="Profile" className="rounded-circle border border-1" width="35" />
            </div>
            <div className="p-1 flex-grow-1">
                <textarea type="text" className="form-control fs-xs" id="add-comment" value={text} onChange={(e)=> setText(e.target.value)} placeholder={t("Comments.write-something")} rows="1"/>
            </div>
            <div className="p-1">
                <button className='btn btn-primary rounded-circle bi bi-send-fill' onClick={saveComment}></button>
            </div>
        </div>
        </div>
    )
}
export default AddComment
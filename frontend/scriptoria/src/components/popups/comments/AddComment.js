import Cookies from 'js-cookie'
import React, {useState, useEffect} from 'react'
import logo from "../../../img/content.png";
import { findAccount } from '../../../api/accountApi'
import { sendComment } from '../../../api/commentsApi'
import { useTranslation } from 'react-i18next';


const AddComment = ({storyId, signedIn, updateComments}) => {
    const {t} = useTranslation()
    const [user, setUser] = useState({})
    const [imageUrl, setImageURL] = useState(logo)

    useEffect(()=>{
        const fetchData = async()=>{
            if(signedIn){
                const userName = Cookies.get("userInfo")
                const data = await findAccount({userName})
                if(data.message){
                    setUser(data.user)
                    setImageURL(`data:image/png;base64,${data.user.profilePicture}`)
                }
            }
        }
        fetchData()
    },[])

    const saveComment = async()=>{
        if(signedIn){
            const comment = {
                accountId : user._id,
                storyId,
                text : document.getElementById('add-comment').value
        }
        const token = Cookies.get("token")
        try {
            await sendComment(comment, token);
            document.getElementById('add-comment').value = '';
            updateComments();
          } catch (error) {
            console.log(error);
          }
    }
}

return (
    <div className="d-flex flex-row bg-light w-100 rounded">
            <div className="p-1 bd-highlight">
                <img src={imageUrl} alt="Profile" className="rounded-circle" width="35" />
            </div>
            <div className="p-1 bd-highlight flex-grow-1">
                <textarea type="text" className="form-control fs-xs" id="add-comment" placeholder={t("Comments.write-something")}/>
            </div>
            <div className="p-1 bd-highlight">
                <button className='btn btn-primary bi bi-send-fill' onClick={saveComment}></button>
            </div>
        </div>
  )
}

export default AddComment
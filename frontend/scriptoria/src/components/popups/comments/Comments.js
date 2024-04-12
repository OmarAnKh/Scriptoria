import React, {useState, useEffect} from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import Cookies from 'js-cookie'
import { getComments } from '../../../api/commentsApi'
import { findAccount } from '../../../api/accountApi'
import { useTranslation } from 'react-i18next';

const Comments = () => {
  const {t} = useTranslation()
  const [signedIn, setSignedIn] = useState(false);
  const [comments, setComments] = useState([])
  const [user, setUser] = useState({})
  const storyId = "65fb62a8ee26f1f61eefc481"

  useEffect(() => {
    const userName = Cookies.get("userInfo");
    const fetchData = async () => {
      if (userName !== undefined) {
        setSignedIn(true);
        const value = await getComments(storyId);
        if (value !== undefined) {
          setComments(value.data);
        }
        const data = await findAccount({ userName });
        if (data.message) {
          setUser(data.user);
        }
      } else {
        setSignedIn(false);
      }
    };
    fetchData();
  }, []);
  
  const updateComments = async () => {
    const value = await getComments(storyId);
    if (value !== undefined) {
      setComments(value.data);
    }
  };

  const getDateStringDifference = (date1, date2)=> {
    
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
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Comment
  </button>
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable p-0">
      <div className="modal-content">
        <div className="modal-header py-2">
          <h2 className="modal-title fs-5" id="staticBackdropLabel">{t("Comments.Comments")}</h2>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body overflow-x-hidden p-0 m-0">
    {

comments.map((comment, index) => {  
  return (
      <Comment 
          userId = {user._id}
          key={index}
          commentId={comment._id}
          account={comment.accountId}
          text={comment.text}
          time={getDateStringDifference(new Date(), new Date(comment.createdAt))}
          updateComments={updateComments}
          likes="1"
      />
  );
})

    }
</div>

      {signedIn ? <div className="modal-footer p-0">
        <AddComment signedIn={signedIn} updateComments={updateComments}/>
        </div> : ``}
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default Comments
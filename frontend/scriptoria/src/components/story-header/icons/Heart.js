import { useState } from "react";
import { saveDocument, updateDocument } from "../../../api/API's";

const Heart = ({num, id, point, setData}) => {

    const [heartIcon, setHeartIcon] = useState("text-white");
    const [isLiked, setIsLiked] = useState(false)

    const ChangeIconColor = () => {
        setHeartIcon((originalColor) => (originalColor == "text-white" ? "text-danger" : "text-white"));
    }

    const handleClick = async () => {
        
        if(isLiked) {
            const updated = await updateDocument(point, {id: id , likes: num - 1})
            setIsLiked(false)
            setData(updated)

        } else {
            const updated = await updateDocument(point, {id: id , likes: num + 1})
            setIsLiked(true)
            setData(updated)

            const currentDate = new Date();
            await saveDocument('likes', {
                AccountId: '661141dafaf51791f652bea9',
                StoryId: id,
                publishDate: currentDate.toISOString()
            })
        }

        ChangeIconColor()
    }    

    return(  
        <span className="mx-5">
            <span className={`px-2 rounded ${heartIcon} heading ms-auto d-flex flex-column align-items-center`}>
                <i className="bi bi-heart-fill" style={{color: heartIcon, cursor: 'pointer', justifySelf: 'center', fontSize: '2rem' }} onClick={handleClick}></i>
            </span>
            <h6 className="text-white"> {num}<span className="icon-title"> likes</span></h6>
        </span>
    );
}

export default Heart;
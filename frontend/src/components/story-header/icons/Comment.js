import { useEffect, useState } from "react";
import { getCommentsCount } from "../../../api/commentsApi";
import Comments from "../../comments/Comments";

const Comment = ({id, t}) => {

    const [commentsCount, setCommentsCount] = useState(0)
    const [triggerCount, setTriggerCount] = useState(false)

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await getCommentsCount(id);
                setCommentsCount(response.counts);
            } catch (error) {
                console.log(error)
            }
        }

        fetchRatings();
    }, [triggerCount])

    return(     
        <span className="mx-5">
            <span className={`px-2 rounded heading ms-auto d-flex flex-column align-items-center`}>
                <Comments id={id} triggerCount={triggerCount} setTriggerCount={setTriggerCount}/>
                <h6 className="text-white"> {commentsCount} <span className=" icon-title"> {t("StoryHeader.Comments")}</span> </h6>
            </span>
        </span>   
    );
}

export default Comment;
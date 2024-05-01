import Comments from "../../popups/comments/Comments";

const Comment = ({id, num, t}) => {

    return(     
        <span className="mx-5">
            <span className={`px-2 rounded heading ms-auto d-flex flex-column align-items-center`}>
                <Comments id={id}/>
                <h6 className="text-white"> {num} <span className=" icon-title"> {t("StoryHeader.Comments")}</span> </h6>
            </span>
        </span>   
    );
}

export default Comment;
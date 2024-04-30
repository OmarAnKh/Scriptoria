import useAuth from "../../../hooks/useAuth"
import { Link } from "react-router-dom"
const MyCard = (props) => {
    const { auth } = useAuth();
    return (
        <div className="custom-card-article">
            <img src={props.photo} alt="couldn't load" className="custom-card-img" />
            <div className="custom-card-data">
                <h2 className="custom-card-title">{props.storytitle}</h2>
                {auth?.userInfo?._id === props.userId ? <Link to={`/StoryDetails/${props.storyId}`} className="custom-card-button">Edit</Link> : <Link to={`/story/${props.storyId}`} className="custom-card-button">Read</Link>}
            </div>
        </div>
    )
}
export default MyCard
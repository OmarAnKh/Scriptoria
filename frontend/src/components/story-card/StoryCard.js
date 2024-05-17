import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import StarRating from '../star-rating/StarRating';
import { getWriters } from "../../api/writers";
import { getStoryRates } from "../../api/rateApi";
import { useEffect, useState } from "react";

const StoryCard = ({ story, t }) => {

    const [writers, setWriters] = useState([])
    const [ratings, setRatings] = useState(0)
    const [votes, setVotes] = useState(0)

    useEffect(() => {
        const fetchWriters = async () => {
            try {
                const response = await getWriters(story._id);
                setWriters(response.users || []);
            } catch (error) {
                console.log(error)
            }
        }

        const fetchRatings = async () => {
            try {
                const response = await getStoryRates('rates', story._id);
                setRatings(response.counts.avg);
                setVotes(response.counts.rates);
            } catch (error) {
                console.log(error)
            }
        }

        fetchWriters();
        fetchRatings();

    }, []);


    return(
        <div className={`card mb-1`} style={{ width: '95%', height: '100%', margin: '0 10px', minHeight: '200px', backgroundColor: story?.backgroundColor }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <Link to={`/story/${story?._id}`}>
                        <img
                            src={story?.coverPhoto?.data ? `data:image/jpeg;base64,${Buffer.from(story?.coverPhoto.data).toString('base64')}` : ''}
                            alt="story-img"
                            className="card-img object-fit-cover"
                            style={{ width: '100%', height: '100%', minHeight: '200px' }} />
                    </Link>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title story-title text-white">{story?.title}</h5>
                        <h6 className="author text-white">
                            {writers.map((writer, idx) => (
                                <span key={idx}>
                                    {writer.displayName}
                                    {idx !== writers.length - 1 && ' , '}
                                </span>
                            ))}
                        </h6>
                        <div className="d-flex">
                            <StarRating rating={ratings} /> 
                            <div className='voters text-white'>{votes} {t("CarouselCards.votes")}</div>
                        </div>
                        <p className="card-text description-story text-white">{story?.description}</p>
                        <Link to={`/story/${story?._id}`}><button type="button" className="btn btn-light rounded-4 px-5 fw-bold read-btn">{t("CarouselCards.read_the_book")}</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryCard;
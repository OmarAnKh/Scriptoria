import { Buffer } from 'buffer';
import StarRating from "../star-rating/StarRating";
import "./Card.css"
import { useTranslation } from 'react-i18next';
import { getWriters } from '../../api/writers';
import { useEffect, useState } from 'react';
import { getStoryRates } from '../../api/rateApi';
import { useNavigate } from 'react-router-dom';

const Card = ({ data }) => {
    const { t } = useTranslation();

    const [writers, setWriters] = useState([])
    const [ratings, setRatings] = useState(0)
    const [votes, setVotes] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWriters = async () => {
            try {
                const response = await getWriters(data._id);
                setWriters(response.users || []);
            } catch (error) {
                console.log(error)
            }
        }

        const fetchRatings = async () => {
            try {
                const response = await getStoryRates('rates', data._id);
                setRatings(response.counts.avg);
                setVotes(response.counts.rates);

            } catch (error) {
                console.log(error)
            }
        }

        fetchWriters();
        fetchRatings();

    }, []);

    const handleReadStory = (id) => {
        navigate(`/story/${id}`)
    }

    return (
        <div className="card mb-3 mt-4 col-lg-12" style={{ minHeight: '200px', width: 750, maxHeight: '100%', height: 250, backgroundColor: data.backgroundColor }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={`data:image/png;base64,${Buffer.from(data.coverPhoto).toString('base64')}`} className="cover-img img-fluid rounded-start" alt="..." style={{ maxWidth: '100%', maxHeight: '100%', minHeight: '200px', width: '200px', height: '250px' }} />
                </div>
                <div className="col-md-8 d-none d-md-block">
                    <div className="card-body">
                        <h4 className="card-title">{data.title}</h4>
                        <h6 className="author-name">
                            {writers.map((writer, idx) => {
                                return <span key={idx}>{writer.displayName}</span>;
                            })}
                        </h6>
                        <span className="d-flex">
                            <StarRating rating={ratings} />  &emsp; {votes} votes
                        </span>
                        <p className="card-text text-sm">{data.description}</p>
                        <button type="button" onClick={() => handleReadStory(data._id)} className="btn btn-light rounded-4 px-5 fw-bold read-btn">{t("CarouselCards.read_the_book")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Card
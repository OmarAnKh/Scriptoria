import { Buffer } from 'buffer';
import StarRating from "../star-rating/StarRating";
import "./Card.css"
import { useTranslation } from 'react-i18next';
import { getWriters } from '../../api/writers';
import { useEffect, useState } from 'react';
import { getStoryRates } from '../../api/rateApi';
import { Link, useNavigate } from 'react-router-dom';

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

        <div className={`CarouselCards mb-3 rounded mt-4 col-lg-12`} style={{ backgroundColor: `${data.backgroundColor}` }}>
            <div className="row g-0">
                <div className="col-md-4">
                    {data.coverPhoto && (
                    <Link to={`/story/${data._id}`}>
                        <img src={`data:image/png;base64,${Buffer.from(data.coverPhoto).toString('base64')}`} className="cover-img img-fluid rounded object-fit-cover" alt="..."/>
                    </Link>
                    )}
                </div>
                <div className="col-md-8 my-3">
                    <div className={`CarouselCards-body ${data.textColor}`}>
                        <h4 className="CarouselCards-title">{data.title}</h4>
                        <h6 className="author-name">
                            {writers.map((writer, idx) => (
                                <span key={idx}>
                                    {writer.displayName}
                                    {idx !== writers.length - 1 && ' , '}
                                </span>
                            ))}
                        </h6>
                        
                        <span className="numOfVotes d-flex">
                            <StarRating rating={ratings} />  &emsp; {votes} {t("CarouselCards.votes")}
                        </span>
                        <p className="CarouselCards-text text-sm">{data.description}</p>
                        <Link to={`/story/${data._id}`}><button type="button" className="btn btn-light rounded-4 px-5 fw-bold read-btn">{t("CarouselCards.read_the_book")}</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Card
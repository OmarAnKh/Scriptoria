import StarRating from "../star-rating/StarRating";
import "./Card.css"
import { useTranslation } from 'react-i18next';
const Card = ({ data }) => {
    const { t } = useTranslation();
    return (
        <div className={`carousel-card card mb-3 ${data.bgColor} mt-4 col-lg-12`} style={{ width: 750, maxHeight: '100%', height: 250 }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={data.cover} className="cover-img img-fluid rounded-start" alt="..." style={{ maxWidth: '100%', maxHeight: 250, width: 180 }} />
                </div>
                <div className="col-md-8 d-none d-md-block">
                    <div className={`card-body ${data.textColor}`}>
                        <h4 className="card-title">{data.title}</h4>
                        <h6 className="author-name">{data.author}</h6>
                        <span className="d-flex">
                            <StarRating rating={data.rating} />  &emsp; {data.votes} votes
                        </span>
                        <p className="card-text text-sm">{data.description}</p>
                        <button type="button" className="btn btn-light rounded-4 px-5 fw-bold read-btn">{t("CarouselCards.read_the_book")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Card
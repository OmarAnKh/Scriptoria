import "./Card.css"
import StarRating from "./StarRating";

const Card = ({data}) => {
    return(
        <div className={`card mb-3 ${data.bgColor} mt-4 col-lg-12`} style={{ width: 650, maxHeight: 300 }}>
            <div class="row g-0">
                <div class="col-md-4">
                <img src={data.cover} className="cover-img img-fluid rounded-start" alt="..." style={{ maxWidth: 400, maxHeight: 250 }}/>
                </div>
                <div class="col-md-8 d-none d-md-block">
                    <div class={`card-body ${data.textColor}`}>
                        <h4 class="card-title">{data.title}</h4>
                        <h6 className="author-name">{data.author}</h6>
                        <span className="d-flex">
                            <StarRating rating={data.rating}/>  &emsp; {data.votes} votes
                        </span>
                        <p class="card-text text-sm">{data.description}</p> 
                        <button type="button" class="btn btn-light rounded-4 px-5 fw-bold read-btn">Read the book</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Card;
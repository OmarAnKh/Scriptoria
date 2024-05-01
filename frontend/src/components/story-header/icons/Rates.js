import StarRating from "../../star-rating/StarRating";
import Rate from "../../popups/rate/Rate";

const Rates = ({id, num, avg}) => {

    return(     
        <span className="mx-5">
            <span className={`px-2 rounded heading ms-auto text-white d-flex flex-column align-items-center`}>
                <Rate id={id}/>
                <StarRating rating={avg}/>
                <h6 className="my-0 mx-1 icon-title" style={{justifySelf: 'center'}}> {num} votes</h6>
            </span>
        </span>   
    );
}

export default Rates;
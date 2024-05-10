import { Tooltip } from "react-tooltip";
const StarRating = ({ rating }) => {

    const numOfStars = 5;
    const stars = []

    const createStars = () => {
        for (let i = 0; i < numOfStars; i++) {

            if (i < Math.floor(rating)) {
                // full star
                stars.push(<i className='bi bi-star-fill' key={i} style={{ color: '#ffc107' }} />)
            } else if (i < rating && i === Math.floor(rating)) {
                // half star
                stars.push(<i className='bi bi-star-half' key={i} style={{ color: '#ffc107' }} />)
            } else {
                // empty star
                stars.push(<i className='bi bi-star-fill' key={i} style={{ color: '#e4e5e9' }} />)
            }
        }

        return stars;
    }

    return (
        <div  data-tooltip-id="my-tooltip" data-tooltip-content={`${rating}/5 stars`} data-tooltip-place='bottom'>
            <Tooltip id="my-tooltip" />
            {createStars()}
        </div>
    );
}

export default StarRating;
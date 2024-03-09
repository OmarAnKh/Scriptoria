const StarRating = ({ rating }) => {

    const numOfStars = 5;
    const stars = []

    const createStars = () => {
        for (let i = 0; i < numOfStars; i++) {

            if (i < Math.floor(rating)) {
                // full star
                stars.push(<i className='bi bi-star-fill' style={{ color: '#ffc107' }} />)
            } else if (i < rating && i === Math.floor(rating)) {
                // half star
                stars.push(<i className='bi bi-star-half' style={{ color: '#ffc107' }} />)
            } else {
                // empty star
                stars.push(<i className='bi bi-star-fill' style={{ color: '#e4e5e9' }} />)
            }
        }

        return stars;
    }

    return (
        <div>
            {createStars()}
        </div>
    );
}

export default StarRating;
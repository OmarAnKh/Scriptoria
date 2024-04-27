import { Link } from 'react-router-dom';
import './Book.css'

const Book = ({ data, id }) => {
    return (
        <div className="book">
            <Link
                to={`/stories/${id}`}>
                <img src={data} alt="Book cover" /></Link>
        </div>
    );
}

export default Book;
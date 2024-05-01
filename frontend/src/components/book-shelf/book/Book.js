import { Link } from 'react-router-dom';
import './Book.css'

const Book = ({ data, id,to }) => {
    return (
        <div className="book">
            <Link
                to={to}>
                <img src={data} alt="Book cover" /></Link>
        </div>
    );
}

export default Book;
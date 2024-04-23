import './Book.css'

const Book = ({ data }) => {
    return (
        <div className="book">
            <img src={data} alt="Book cover" />
        </div>
    );
}

export default Book;
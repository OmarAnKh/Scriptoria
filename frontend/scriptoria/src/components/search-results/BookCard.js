import Book from "./Book.js"
import Card from "./Card.js";

const BookCard = (props) => {
    return (
        <div className="bookFrame">
            <div className="BookCard">
                <Book img={props.imgURL} />
                <Card
                    description={props.description}
                    name={props.name}
                    auther={props.auther}
                />
            </div>
        </div>
    );
}

export default BookCard
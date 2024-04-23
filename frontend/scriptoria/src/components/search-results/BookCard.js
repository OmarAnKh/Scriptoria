import Book from "./Book.js"
import Card from "./Card.js";
import { Buffer } from "buffer";
const BookCard = (props) => {
    return (
        <div className="bookFrame">
            <div className="BookCard">
                {props?.imgURL ? <Book data={`data:image/png;base64,${Buffer.from(props?.imgURL).toString('base64')}`} /> : <></>}
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
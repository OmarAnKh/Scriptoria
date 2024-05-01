import React from 'react';
import "./Book.css"



const Book = (props) => {
    return (
        <div className="book-container">
            <div className="Searchbook">
                <img src={props.img} alt="Book Cover" />
            </div>
        </div>
    );
};

export default Book;
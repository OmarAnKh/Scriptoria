import React, { useState } from 'react';
import './FlipBook.css'; // Make sure this path is correct

const Book = () => {
    const [flippedPages, setFlippedPages] = useState([]);

    const handlePageClick = (pageNum) => {
        const updatedFlippedPages = [...flippedPages];
        const pageIndex = updatedFlippedPages.indexOf(pageNum);

        if (pageIndex === -1) {
            updatedFlippedPages.push(pageNum);
        } else {
            updatedFlippedPages.splice(pageIndex, 1);
        }

        setFlippedPages(updatedFlippedPages);
    };

    return (
        <div className="book-container">
            <div className="book-pages">
                {[...Array(32)].map((_, index) => (
                    <div
                        key={index}
                        className={`book-page ${flippedPages.includes(index) ? 'flipped' : ''}`}
                        onClick={() => handlePageClick(index)}
                    >
                        {index % 2 === 0 ? <p>Open Me, <br /> please!</p> : <p>Hello there!</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Book;

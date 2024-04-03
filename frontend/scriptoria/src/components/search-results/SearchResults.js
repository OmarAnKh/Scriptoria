import "./SearchResults.css"
import React, { useEffect, useState } from 'react';
import BookCard from "./BookCard";
import { useParams, useNavigate } from "react-router-dom";
import { findStory } from "../../api/storyAPI";
import { Buffer } from 'buffer';
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
const SearchResultsPage = () => {
    const { criteria } = useParams()
    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await findStory(criteria)
                if (res.status === true) {
                    setBooks(res.stories)
                    return
                }
                navigate('*')
                return
            } catch (error) {
                navigate('*')
                return
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100" >
                <div className="row">
                    <div className="col text-center">
                        <div className="Search-container">

                            {books.map((book, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <BookCard
                                            imgURL={`data:image/png;base64,${Buffer.from(book.coverPhoto.data).toString('base64')}`}
                                            description={book.description}
                                            name={book.title}
                                            key={index}
                                        />
                                    </React.Fragment >)
                            })


                            }

                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
};

export default SearchResultsPage;

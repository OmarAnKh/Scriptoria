import "./SearchResults.css"
import React, { useEffect, useState } from 'react';
import BookCard from "./BookCard";
import { useParams, useNavigate, Link } from "react-router-dom";
import { findStory } from "../../api/storyAPI";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import CardOfUsers from "../search-results/CardOfUsers";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, 
    },
    mobile: {
      breakpoint: { max: 434, min: 0 },
      items: 1,
      slidesToSlide: 1,
    }
  };

const SearchResultsPage = () => {
    const { criteria } = useParams()
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await findStory(criteria)
                if (res.status === true) {
                    setBooks(res.stories)
                    setUsers(res.users)
                    return
                }
                navigate('/StoryErrorsPage')
                return
            } catch (error) {
                navigate('/ServersErrorPage')
                return
            }
        }
        fetchData()
    }, [])

    return (

        <>
         <Navbar /> 
         <div className="container my-5" >
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {users?.length ?
                            <Carousel
                                responsive={responsive}
                                infinite={true}
                                swipeable={true}
                                draggable={false}
                                showDots={false}
                                ssr={true}
                                autoPlay={false}
                                autoPlaySpeed={1000}
                                keyBoardControl={true}
                                customTransition="transform 1000ms ease-in-out"
                                transitionDuration={800}
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                focusOnSelect={true}
                                partialVisbile={false}
                            >
                                {users.map((user, index) => (
                                    <CardOfUsers
                                        key={index}
                                        userId={user._id}
                                        userName={user.userName}
                                        displayName={user.displayName}
                                        images={`data:image/png;base64,${user?.profilePicture}`}
                                    />
                                ))}
                            </Carousel>
                            :
                            <></>}
                    </div>
                </div>
            </div>
       
          <div className="Search-container">
                            {books.map((book, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <BookCard
                                            storyId={book._id}
                                            imgURL={book.coverPhoto.data}
                                            description={book.description}
                                            name={book.title}
                                            rate={book.rate}
                                            key={index}
                                        />
                                    </React.Fragment >)
                            })
                            }
                            </div>
        </>
    );

};

export default SearchResultsPage;

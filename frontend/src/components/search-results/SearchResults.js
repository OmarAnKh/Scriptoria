import "./SearchResults.css"
import React, { useEffect, useState } from 'react';
import BookCard from "./BookCard";
import { useParams, useNavigate } from "react-router-dom";
import { findStory } from "../../api/storyAPI";
import Navbar from "../navbar/Navbar";
import CardOfUsers from "../search-results/CardOfUsers";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SearchResultsPlaceholder from "../placeholder/SearchResultsPlaceholder";

const SearchResultsPage = () => {
    const { criteria } = useParams()
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const [responsive, setResponsive] = useState({})
    const [searchFlag, setSearchFlag] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setSearchFlag(false);
        const fetchData = async () => {
            try {
                const res = await findStory(criteria)
                setSearchFlag(true)
                if (res.status === true) {
                    setBooks(res.stories)
                    setUsers(res.users)
                    setResponsive({
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: res.users.length >= 3 ? 3 : 2,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: res.users > 1 ? 2 : 1,
                            partialVisibilityGutter: 30
                        }
                    })
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
    }, [criteria])

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {users?.length ?
                            <Carousel
                                additionalTransfrom={0}
                                arrows
                                autoPlaySpeed={3000}
                                centerMode={false}
                                containerClass="container-with-dots"
                                dotListClass=""
                                draggable
                                focusOnSelect={false}
                                infinite
                                itemClass=""
                                keyBoardControl
                                minimumTouchDrag={80}
                                pauseOnHover
                                renderArrowsWhenDisabled={false}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                responsive={responsive}
                                rewind={false}
                                rewindWithAnimation={false}
                                rtl={false}
                                shouldResetAutoplay
                                showDots={false}
                                sliderClass=""
                                slidesToSlide={1}
                                swipeable
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
                            <>{!searchFlag ? <SearchResultsPlaceholder type="user-card" /> : <></>}</>}
                    </div>
                </div>
            </div>
            <div className="Search-container">
                {books?.length !== 0 ? books?.map((book, index) => {
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
                    : <SearchResultsPlaceholder type="story-card" />}
            </div>
        </>
    );

};

export default SearchResultsPage;
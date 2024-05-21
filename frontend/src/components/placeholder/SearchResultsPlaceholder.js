import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SearchResultsPlaceholder = ({ type }) => {
    if (type === "user-card") {
        return (
            <div className='row'>
                {Array(3).fill().map((_, idx) => {
                    return (
                        <div className='col' key={idx}>
                            <div className="card searchProfile" >
                                <div>
                                    <Skeleton
                                        animation="wave"
                                        className='card-img m-0'
                                        variant="circular"
                                        style={{ width: "170px", height: "170px", borderRadius: "50%", backgroundColor: "var(--praimary-Color)" }}
                                    />
                                </div>
                                <div className="textContainer">
                                    <Skeleton
                                        animation="wave"
                                        style={{ backgroundColor: "var(--praimary-Color)" }}
                                    />
                                    <Skeleton
                                        animation="wave"
                                        style={{ backgroundColor: "var(--praimary-Color)" }}
                                    />
                                </div>
                                <Skeleton
                                    animation="wave"
                                    style={{ width: '100%', height: '100%', minHeight: '200px', backgroundColor: "var(--praimary-Color)" }}
                                />
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
    if (type === "story-card") {
        return (
            <>
                {
                    Array(3).fill().map((_, idx) => {
                        return (
                            <div className="bookFrame" key={idx}>
                                <div className="BookCard">
                                    <div className='info-container' >
                                        <p className="h1">
                                            <Skeleton
                                                animation="wave"
                                                style={{ width: '100%', height: '100%', backgroundColor: "var(--praimary-Color)" }}
                                            />
                                        </p>
                                        <br />
                                        <div className="nexteach">
                                            <p>
                                                <Skeleton
                                                    animation="wave"
                                                    style={{ width: '100%', height: '100%', backgroundColor: "var(--praimary-Color)" }}
                                                />
                                            </p>
                                            <div className="Placement">
                                                <div className="buttonflex">
                                                    <Skeleton
                                                        className="intractButton"
                                                        animation="wave"
                                                        style={{ width: '100%', height: '100%', backgroundColor: "var(--praimary-Color)" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        )
                    })
                }
            </>)
    }
}

export default SearchResultsPlaceholder
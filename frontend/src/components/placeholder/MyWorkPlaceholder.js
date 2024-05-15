import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MyWorkPlaceholder = ({ type }) => {
    if (type === "mycard") {
        return (
            <>
                {
                    Array(3).fill().map((_, idx) => {
                        return (
                            <div className="custom-card-article">
                                <Skeleton height={280} style={{}} />
                                <div className="custom-card-data">
                                    <Skeleton />
                                    <Skeleton />
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    if (type === "topcard") {
        return (
            <>
                {
                    Array(3).fill().map((_, idx) => {
                        return (
                            <div className="TopCard">
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                            </div>
                        )
                    })
                }
            </>
        )
    }
}

export default MyWorkPlaceholder
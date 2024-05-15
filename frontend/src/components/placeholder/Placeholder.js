import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Placeholder = () => {
    return (
        <div className="d-flex flex-wrap">
            {
                Array(3).fill().map((_, idx) => {
                    return (
                        <div key={idx} className={`col-md-4 mb-3 my-5`}>
                            <div className={`card mb-1`} style={{ width: '95%', height: '100%', margin: '0 10px', minHeight: '200px',backgroundColor: "var(--accent-Color)"  }} >
                                <div className="row no-gutters">
                                    <div className="col-md-4 pb-5">
                                        <Skeleton
                                            animation="wave"
                                            className='card-img'
                                            style={{ width: '100%', height: '100%', minHeight: '200px', backgroundColor: "var(--praimary-Color)" }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title story-title text-white"></h5>
                                            <h6 className="author text-white">
                                                <Skeleton width={100} style={{ backgroundColor: "var(--praimary-Color)" }}/>
                                                <Skeleton style={{ backgroundColor: "var(--praimary-Color)" }}/>
                                                <Skeleton width={150}style={{ backgroundColor: "var(--praimary-Color)" }} />
                                            </h6>
                                            <div className="d-flex">
                                                <div className='voters text-white'></div>
                                            </div>
                                            <p className="card-text description-story text-white"></p>
                                            <Skeleton style={{ backgroundColor: "var(--accent-Color)" }} />
                                            <Skeleton style={{ backgroundColor: "var(--accent-Color)" }} />
                                            <Skeleton style={{ backgroundColor: "var(--accent-Color)" }} />
                                            <Skeleton animation="wave" className='btn btn-light rounded-4 px-5 fw-bold read-btn' width={200} height={50} style={{ backgroundColor: "var(--accent-Color)" }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default Placeholder
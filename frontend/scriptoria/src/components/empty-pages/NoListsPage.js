import React from 'react'
import image from './../../img/no-lists.png'
import { Link } from 'react-router-dom'

const NoListsPage = () => {
  return (
    <>
    <div className="container py-2 align-items-center mt-5 text-center">
        <img src={image} alt="logout" className="img-fluid" width="400" />
      </div>
      <div className="text-center mb-5">
        <p className="fw-bold h1">this user may not have one public list at least</p>
        <Link to={'/'} className="h5 fw-bold text-secondary text-decoration-none">return to home page</Link>
      </div>
    </>
  )
}

export default NoListsPage
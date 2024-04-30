import React from 'react'
import image from './../../img/private-list.png'
import { Link } from 'react-router-dom'

const PrivateList = () => {
  return (
    <>
    <div className="container align-items-center py-2 mt-5 text-center">
        <img src={image} alt="private-list" className="img-fluid" width="500" />
      </div>
      <div className="text-center mb-5">
      <p className="fw-bold h1">Access Denied</p>
        <p
          className="h5 fw-bold text-secondary text-decoration-none"
        >
          you have no access to reach this page
        </p>
        <Link to={'/'} className="h5 fw-bold text-secondary text-decoration-none">return to home page</Link>
      </div>
    </>
  )
}

export default PrivateList
import React from 'react'
import image from './../../img/access-denied.png'
import { Link } from 'react-router-dom'
import Navbar from './../navbar/Navbar'

const NoAccessPage = () => {
  return (
    <>
    <Navbar/>
    <div className="container py-2 mt-5 text-center">
        <img src={image} alt="no-access" className="img-fluid" width="400" />
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

export default NoAccessPage
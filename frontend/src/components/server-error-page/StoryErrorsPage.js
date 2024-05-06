import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import BookPage from "../../img/BookPage.png";

const StoryErrorsPage = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-md-12  text-center">
            <img src={BookPage} alt="ErrorImg" className="img-fluid" style={{ maxWidth: "70%", height: "auto" }}  />
            <p className="mt-2" style={{ fontSize: "calc(2.2rem + 0.5vw)", fontWeight: "bold", color: "var(--text-Color)" }}>Search something less silly next time!</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StoryErrorsPage
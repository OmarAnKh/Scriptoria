import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import BookPage from "../../img/BookPage.png";
const StoryErrorsPage = () => {
  return (
    <div>
<Navbar/>
<div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="row">
                    <div className="col text-center">
                        <img src={BookPage} alt="ErrorImg" className="img-fluid" style={{ maxWidth: "700px" }} />
                        <p className="mt-2" style={{ fontSize: "calc(2rem + 0.5vw)", fontWeight: "bold" }}>Search something less silly next time!</p>
                    </div>
                </div>
            </div>
<Footer/>
    </div>
  )
}

export default StoryErrorsPage
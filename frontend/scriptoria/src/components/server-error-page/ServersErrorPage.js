import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import server from "../../img/Server.png";

const ServersErrorPage = () => {
  return (
    <div>
<Navbar/>

<div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="row">
                    <div className="col text-center">
                        <img src={server} alt="ErrorImg" className="img-fluid" style={{ maxWidth: "650px" }} />
                        <p className="mt-2" style={{ fontSize: "calc(2rem + 0.5vw)", fontWeight: "bold" }}>Seems like a server error?!</p>
                    </div>
                </div>
            </div>
<Footer/>
    </div>
  )
}

export default ServersErrorPage

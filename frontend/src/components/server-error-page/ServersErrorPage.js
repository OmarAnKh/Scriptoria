import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import server from "../../img/Server.png";


const ServersErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-md-12  text-center">
            <img src={server} alt="ErrorImg" className="img-fluid" style={{ maxWidth: "70%", height: "auto" }}  />
            <p className="mt-2" style={{ fontSize: "calc(2.5rem + 1vw)", fontWeight: "bold", color: "var(--text-Color)" }}>seems like a server error!?</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ServersErrorPage;

import React from 'react';
import './WpNavBar.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../../img/scriptoria-logo.png'
import { Link } from 'react-router-dom'



const WpNavBar = ({ setMode }) => {
    const handleMode = () => {
        setMode()
    }
    return (
        <nav className="navbar navbar-expand-lg WpNavBar py-0 fixed-top d-flex justify-content-center" id="WpNavBar">
            <div className="container-fluid">
                <Link to={`/Home `} className="card-text" target="" ><img className='logo-size py-0' src={Logo} alt="no"></img><a className="Scriptoria ourbtn fs-2 py-0">Scriptoria</a>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <div className='mx-auto'>
                <ol className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <button type="button" className="btn btn-outline-dark rounded-5 m-2">Save</button>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-outline-dark rounded-5 m-2" onClick={handleMode}>Focus mode</button>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-outline-dark rounded-5 m-2">Publish</button>
                    </li>
                </ol>
                </div>
            </div>
        </div>
        </nav >
    )
}

export default WpNavBar
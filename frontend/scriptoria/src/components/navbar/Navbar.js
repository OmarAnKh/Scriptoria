
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/scriptoria-logo.png"
import "./Navbar.css";
import NavHomeButton from "./NavbarButton";
import Cookies from 'js-cookie'

const NavHomeLink = ({ to, children }) => (
    <Link className="nav-link" to={to}>{children}</Link>
);

const Navbar = () => {
    const [hasAccount, setHasAccount] = useState(Cookies.get('userInfo'))
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="card-text d-flex align-items-center">
                    <img className="logo-size" src={Logo} alt="Scriptoria Logo" />
                    <div className="d-none d-md-block">
                        <span className="Scriptoria ourbtn fs-2 py-0 px-0">Scriptoria</span>
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="nav-links-container">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <div className="nav-home-link">
                                <NavHomeLink to="/">Home</NavHomeLink>
                                <NavHomeLink to="/browse">Browse</NavHomeLink>
                                <NavHomeLink to="/browse-by-language">Browse by Language</NavHomeLink>
                            </div>
                            <form className="d-flex" role="search">
                                <input className=" search-navbar form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                            <div className="right-side">
                                {
                                    hasAccount ? <><Link type="button" className="addstory btn btn-outline-dark rounded-5 m-2" to={`/StoryDetails`}>
                                        add a story
                                    </Link>
                                        <NavHomeButton iclassName="bi bi-translate" />
                                        <NavHomeButton iclassName="bi bi-inbox" />
                                        <NavHomeButton iclassName="bi bi-bell" />
                                        <NavHomeButton iclassName="bi bi-person-circle" />
                                    </> : <><Link type="button" className="addstory btn btn-outline-dark rounded-5 m-2" to={`/SignIn`}>
                                        SignIn
                                    </Link>
                                        <Link type="button" className="addstory btn btn-outline-dark rounded-5 m-2" to={`/SignUp`}>
                                            SignUp
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
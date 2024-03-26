
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/scriptoria-logo.png"
import "./Navbar.css";
import NavHomeButton from "./NavbarButton";
import Cookies from 'js-cookie'
import { logoutAccount } from "../../api/accountApi";

const NavHomeLink = ({ to, children }) => (
    <Link className="nav-link" to={to}>{children}</Link>
);



const Navbar = () => {
    const [hasAccount, setHasAccount] = useState(Cookies.get('userInfo'))

    const noHandel = () => { }

    const logoutHandel = async () => {
        const token = Cookies.get("token")
        const response = await logoutAccount(token);
        const clearAllCookies = () => {
            let cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
        }
        setHasAccount(null)
        clearAllCookies();

    }

    const accountDropDown = [
        {
            title: "profile",
            to: "/profile",
            method: noHandel
        },
        {
            title: "settings",
            to: "/",
            method: noHandel
        },
        {
            title: "logout",
            to: "/",
            method: logoutHandel
        }

    ]

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
                                <NavHomeButton iclassName="bi bi-search search-icon" className="input-group rounded" buttonClassName="input-group-text border-0 button-search" method={noHandel}>
                                    <input type="search" className="form-control rounded search-navbar-input" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                </NavHomeButton>
                            </form>
                            <div className="right-side">
                                {
                                    hasAccount ? <><Link type="button" className="addstory btn btn-outline-dark rounded-5 m-2" to={`/StoryDetails`}>
                                        add a story
                                    </Link>
                                        <NavHomeButton iclassName="bi bi-translate" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={noHandel} />
                                        <NavHomeButton iclassName="bi bi-inbox" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={noHandel} />
                                        <NavHomeButton iclassName="bi bi-bell" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={noHandel} />
                                        <NavHomeButton iclassName="bi bi-person-circle" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" isDropDown={true} accountDropDown={accountDropDown} />
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
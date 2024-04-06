import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/scriptoria-logo.png"
import "./Navbar.css";
import NavHomeButton from "./NavbarButton";
import Cookies from 'js-cookie'
import { findAccount, logoutAccount } from "../../api/accountApi";
import { useTranslation } from 'react-i18next';

const NavHomeLink = ({ to, children }) => (
    <Link className="nav-link" to={to}>{children}</Link>
);



const Navbar = () => {
    const [hasAccount, setHasAccount] = useState(Cookies.get('userInfo'))
    const [accountId, setAccountId] = useState("*");
    const [accountUserName, setAccountUserName] = useState("*")
    const { t, i18n } = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            const userName = Cookies.get("userInfo");
            setAccountUserName(`/profile/${userName}`)
            const account = await findAccount({ userName });
            if (!account.message) {
                setAccountId("*");
            } else {
                setAccountId(`/settings/${account._id}`);
            }
        };

        fetchData();

        return () => { };
    }, []);

    const noHandel = () => { }
    const translationHandler = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('ar')
            return
        }
        i18n.changeLanguage('en')
    }
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
            title: t("Navbar.profile"),
            to: accountUserName,
            method: noHandel
        },
        {
            title: t("Navbar.settings"),
            to: accountId,
            method: noHandel
        },
        {
            title: t("Navbar.logout"),
            to: "/",
            method: logoutHandel
        }

    ]

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid ">
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
                                <NavHomeLink to="/">{t("Navbar.home")}</NavHomeLink>
                                <NavHomeLink to="/browse">{t("Navbar.browse")}</NavHomeLink>
                                <NavHomeLink to="/TeamMembers">{t("Navbar.teamMembers")}</NavHomeLink>
                            </div>
                            <form className="d-flex" role="search">
                                <NavHomeButton iclassName="bi bi-search search-icon" className="input-group rounded" buttonClassName="input-group-text border-0 button-search" method={noHandel}>
                                    <input type="search" className="form-control rounded search-navbar-input" placeholder={t("Navbar.search")} aria-label="Search" aria-describedby="search-addon" />
                                </NavHomeButton>
                            </form>
                            <div className="right-side">
                                {
                                    hasAccount ? <><Link type="button" className="addstory btn btn-outline-dark rounded-5 m-2" to={`/StoryDetails`}>
                                        {t("Navbar.add_a_story")}
                                    </Link>
                                        <NavHomeButton iclassName="bi bi-translate" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={translationHandler} />
                                        <NavHomeButton iclassName="bi bi-inbox" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={noHandel} />
                                        <NavHomeButton iclassName="bi bi-bell" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={noHandel} />
                                        <NavHomeButton iclassName="bi bi-person-circle" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" isDropDown={true} accountDropDown={accountDropDown} />
                                    </> : <><Link type="button" className="addstory btn btn-outline-dark rounded-5 m-2" to={`/SignIn`}>
                                        {t("Navbar.signIn")}
                                    </Link>
                                        <Link type="button" className="addstory btn btn-outline-dark rounded-5 m-2" to={`/SignUp`}>
                                            {t("Navbar.signUp")}
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


export default Navbar

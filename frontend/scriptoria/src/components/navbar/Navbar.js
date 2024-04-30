import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../img/scriptoria-logo-black.png"
import "./Navbar.css";
import NavHomeButton from "./NavbarButton";
import { findAccount } from "../../api/accountApi";
import { useTranslation } from 'react-i18next';
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../theme-toggle/ThemeToggle.js"

const NavHomeLink = ({ to, children }) => (
    <Link className="nav-link" to={to}>{children}</Link>
);

const Navbar = () => {

    const logout = useLogout();
    const { auth } = useAuth();

    const [hasAccount, setHasAccount] = useState(auth)
    const [accountId, setAccountId] = useState("*");
    const [accountUserName, setAccountUserName] = useState("*")
    const { t, i18n } = useTranslation()

    const [searchCriteria, setSearchCriteria] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userName = auth.userName;
            setAccountUserName(`/profile/${userName}`)
            const account = await findAccount({ userName });
            if (!account?.message) {
                setAccountId("*");
            } else {
                setAccountId(`/settings/${account._id}`);
            }
        };

        fetchData();

        return () => { };
    }, []);

    const noHandel = () => { }

    const translationHandler = (lang) => {
        i18n.changeLanguage(lang)
        return
    }
    const logoutHandel = async () => {
        await logout();
        const clearAllCookies = () => {
            let cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {

                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
        }
        setHasAccount({})
        clearAllCookies();
    }

    const accountDropDown = [
        {
            title: t("Navbar.profile"),
            to: accountUserName,
            method: noHandel
        },
        {
            title: t("Navbar.lists"),
            to: accountUserName + "/lists",
            method: noHandel
        }, {
            title: "My works",
            to: `/MyWorks/${auth?.userInfo?._id}`,
            method: noHandel
        },
        {
            title: t("Navbar.settings"),
            to: accountId,
            method: noHandel
        },
        {
            title: t("Navbar.logout"),
            to: "/logout",
            method: logoutHandel
        }

    ]



    const languageDropDown = [
        {
            title: t("Navbar.arabic"),
            to: "",
            method: () => { translationHandler('ar') }
        },
        {
            title: t("Navbar.english"),
            to: "",
            method: () => { translationHandler('en') }
        },
        {
            title: t("Navbar.mandarin"),
            to: "",
            method: () => { translationHandler('zh') }
        },
        {
            title: t("Navbar.hindi"),
            to: "",
            method: () => { translationHandler('hin') }
        },
        {
            title: t("Navbar.spanish"),
            to: "",
            method: () => { translationHandler('es') }
        }
        ,
        {
            title: t("Navbar.french"),
            to: "",
            method: () => { translationHandler('fr') }
        }
        ,
        {
            title: "...",
            to: "https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb",
            method: noHandel
        }
    ]

    const searchHandel = () => {
        if (searchCriteria === "") {
            return;
        }
        navigate(`/Search/${searchCriteria}`);
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg">
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
                            <div className="d-flex" role="search">
                                <NavHomeButton iclassName="bi bi-search search-icon" className="input-group rounded" buttonClassName="input-group-text border-0 button-search" method={searchHandel}>
                                    <input type="search" className="form-control rounded search-navbar-input" placeholder={t("Navbar.search")} aria-label="Search" aria-describedby="search-addon" onChange={(event) => { setSearchCriteria(event.target.value) }} />
                                </NavHomeButton>
                                <ThemeToggle />
                            </div>
                            <div className="right-side">
                                {
                                    hasAccount.token ? <><Link type="button" className="addstory btn btn-outline-dark rounded-5 m-2" to={`/StoryDetails`}>
                                        {t("Navbar.add_a_story")}
                                    </Link>
                                        <NavHomeButton iclassName="bi bi-globe2 navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" isDropDown={true} accountDropDown={languageDropDown} />
                                        <NavHomeButton iclassName="bi bi-inbox navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={noHandel} />
                                        <NavHomeButton iclassName="bi bi-bell navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={noHandel} />
                                        <NavHomeButton iclassName="bi bi-person-circle navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" isDropDown={true} accountDropDown={accountDropDown} />
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

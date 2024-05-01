import "./NavBar.css"
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../img/scriptoria-logo-black.png"
import SearchBar from "./SearchBar.js"
import NavHomeButton from "./NavbarButton";
import useAuth from "../../hooks/useAuth.js";
import { useTranslation } from 'react-i18next';
import { findAccount } from "../../api/accountApi.js";
import useLogout from "../../hooks/useLogout.js";
import useThemeToggle from "../theme-toggle/ThemeToggle.js"



const NavBar = () => {
    const navRef = useRef();
    const { auth } = useAuth();
    const { t, i18n } = useTranslation()
    const [accountUserName, setAccountUserName] = useState("*")
    const [hasAccount, setHasAccount] = useState(auth)
    const logout = useLogout();
    const [accountId, setAccountId] = useState("*");
    const toggleTheme = useThemeToggle();

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
    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

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

    return (
        <header>
            <div>
                <img className="NavLogo" src={Logo} />
                <Link href="/" className="ScriptoriaName">Scriptoria</Link>
            </div>

            <nav ref={navRef}>
                <Link to="/">Home</Link>
                <Link to="/browse">browse</Link>
                <Link to="/TeamMembers">Team Members</Link>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
                <SearchBar />
            </nav>

            <nav className="hello">
                {
                    auth.userName ? <>
                        <Link type="button" className="addstory btn rounded-5 m-2" to={`/StoryDetails`}>
                            {t("Navbar.add_a_story")}
                        </Link>
                        <NavHomeButton iclassName="bi bi-bell navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={noHandel} />
                        <NavHomeButton iclassName="bi bi-person-circle navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" isDropDown={true} accountDropDown={accountDropDown} />
                    </> : <></>}
                <NavHomeButton iclassName="bi bi-globe2 navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" isDropDown={true} accountDropDown={languageDropDown} />
                <NavHomeButton iclassName="bi bi-moon-stars navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={toggleTheme} />
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );

}
export default NavBar
import "./Navbar.css"
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
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
            title: t("Navbar.works"),
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
            title: "العربية",
            to: "",
            method: () => { translationHandler('ar') }
        },
        {
            title: "English",
            to: "",
            method: () => { translationHandler('en') }
        },
        {
            title: "中文",
            to: "",
            method: () => { translationHandler('zh') }
        },
        {
            title: "हिन्दी",
            to: "",
            method: () => { translationHandler('hin') }
        },
        {
            title: "Español",
            to: "",
            method: () => { translationHandler('es') }
        }
        ,
        {
            title: "Français",
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
                <div className="NavLogo mx-2" />
                <Link to={'/'} className="ScriptoriaName">Scriptoria</Link>
            </div>

            <nav ref={navRef}>
                <Link className="nav-link-color" to="/">{t("Navbar.home")}</Link>
                <Link className="nav-link-color" to="/browse">{t("Navbar.browse")}</Link>
                <Link className="nav-link-color" to="/TeamMembers">{t("Navbar.teamMembers")}</Link>
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
                        <div className="wrapper">
                            <input
                                type="checkbox"
                                name="checkbox"
                                className="switch"
                                checked={localStorage.getItem('theme') === 'dark' ? true : false}
                                onChange={toggleTheme}
                            />
                        </div>
                        <NavHomeButton iclassName="bi bi-globe2 navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" isDropDown={true} accountDropDown={languageDropDown} />
                        <Link to={'/chats'} className="m-0 p-0"><NavHomeButton iclassName="bi bi-chat-heart-fill navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" method={noHandel} /></Link> 
                        
                        <NavHomeButton pfp={true} className="navbar-button" buttonClassName="btn btn rounded-5 m-2" isDropDown={true} accountDropDown={accountDropDown} />
                    </> : <>
                        <NavHomeButton iclassName="bi bi-globe2 navbar-button" className="navbar-button" buttonClassName="btn btn rounded-5 m-2" isDropDown={true} accountDropDown={languageDropDown} />
                        <div className="wrapper">
                            <input
                                type="checkbox"
                                name="checkbox"
                                className="switch"
                                checked={localStorage.getItem('theme') === 'dark' ? true : false}
                                onChange={toggleTheme}
                            />
                        </div>
                    </>}
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
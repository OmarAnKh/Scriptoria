import React, { useState } from 'react'
import RegistrationForm from '../registration/RegistrationForm'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import validator from "validator";
import { saveDocument } from '../../api/API\'s';
import Cookies from "js-cookie"
import useAccount from '../../hooks/useAccount';
import usePassword from '../../hooks/usePassword';
import RegistrationInput from '../registration/RegistrationInput';
import { useTranslation } from 'react-i18next';
import useThemeToggle from "../../hooks/useThemeToggle.js"

const Registration = () => {

    const { t } = useTranslation();
    useThemeToggle();

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const { getAccountByUserName, getAccountByEmail } = useAccount();
    const { isValidPassword } = usePassword();

    const [registrationMode, setRegistrationMode] = useState(false);

    //Sign In and Sign Up variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Sign In variables
    const [signInError, setSignInError] = useState("");
    const [signInEmailError, setSignInEmailError] = useState("");
    const [signInPasswordError, setSignInPasswordError] = useState("");

    //Sign Up variables
    const [userName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [signUpEmailError, setSignUpEmailError] = useState("");
    const [signUpPasswordError, setSignUpPasswordError] = useState("");

    const handleLeftCard = () => {
        setEmail("");
        setPassword("");
        setUserName("");
        setConfirmPassword("");
        setRegistrationMode(false);
    };

    const handleRightCard = () => {
        setEmail("");
        setPassword("");
        setUserName("");
        setConfirmPassword("");
        setRegistrationMode(true);
    };

    const signInHandler = async (event) => {
        event.preventDefault();
        if (!validator.isEmail(email)) {
            setSignInEmailError("The email you provided is not valid")
            setTimeout(() => {
                setSignInEmailError("")
            }, 2000)
            return
        }
        if (password === "") {
            setSignInPasswordError("The password is required")
            setTimeout(() => {
                setSignInPasswordError("")
            }, 2000)
            return
        }
        const account = {
            email, password
        }
        const res = await saveDocument("signIn", account)
        if (res.status === 400) {
            setSignInError("The email or password is not correct")
            return;
        }
        const token = res.token
        const userName = res.user.userName
        setAuth({ userName, token, userInfo: res.user })
        Cookies.set('flag', true)
        navigate("/")
    }

    const signUpHandler = async (event) => {
        event.preventDefault();
        if (userName === "") {
            setUserNameError("The user name is required")
            setTimeout(() => {
                setUserNameError("")
            }, 2000)
            return
        }
        if (userName.includes(" ")) {
            setUserNameError("The user name can`t contain spaces")
            setTimeout(() => {
                setUserNameError("")
            }, 2000)
            return
        }
        let account = await getAccountByUserName(userName)
        if (account.message) {
            setUserNameError("user name already exists")
            setTimeout(() => {
                setUserNameError("")
            }, 2000)
            return
        }

        if (!validator.isEmail(email)) {
            setSignUpEmailError("The email you provided is not valid")
            setTimeout(() => {
                setSignUpEmailError("")
            }, 2000)
            return
        }

        account = await getAccountByEmail(email)
        if (account.message) {
            setSignUpEmailError("Email already exists")
            setTimeout(() => {
                setSignUpEmailError("")
            }, 2000)
            return
        }

        if (!isValidPassword(password)) {
            setSignUpPasswordError("Password must be at least 6 characters long, contain at least one uppercase letter, contain at least one lowercase letter and contain at least one number");
            setTimeout(() => {
                setSignUpPasswordError("")
            }, 10000)
            return
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("The password and confirmed password do not match")
            setTimeout(() => {
                setConfirmPasswordError("")
            }, 2000)
            return;
        }
        const accountInfo = {
            userName, email, password
        }
        navigate(`/registration/info`, { state: { accountInfo } });
    }


    const panelsData = [
        {
            className: "panel left-panel",
            hText: t("Registration.panel_htext"),
            infoText: t("Registration.panel_info_text"),
            btnClassName: "btn-registration",
            btnId: "sign-up-btn",
            onClick: handleRightCard,
            btnText: t("Registration.signup_btn_text")
        },
        {
            className: "panel right-panel",
            hText: t("Registration.panel_htext"),
            infoText: t("Registration.panel_info_text"),
            btnClassName: "btn-registration",
            btnId: "sign-in-btn",
            onClick: handleLeftCard,
            btnText: t("Registration.signin_btn_text")
        }
    ];
    return (
        <RegistrationForm panels={panelsData} registrationMode={registrationMode}>
            <form className="left-registration-card" onSubmit={(event) => signInHandler(event)}>
                <h2 className="title">{t("Registration.signin_btn_text")}</h2>
                <RegistrationInput className="input-field" iClassName="bx bx-envelope" inputClassName={"px-3"} type="text" placeholder={t("Registration.email")} error={signInEmailError} onChange={setEmail} />
                <RegistrationInput className="input-field" iClassName="bx bx-lock-alt" inputClassName={"px-3"} type="password" placeholder={t("Registration.password")} error={signInPasswordError} onChange={setPassword} />
                <p className='registration-input-error'>{signInError}</p>
                <Link to={`/GetEmail`} target="" style={{ textDecoration: "none", color: "rgb(33,33,33)" }}>
                    <p>{t("Registration.forgot_password")} <span style={{ textDecoration: "underline", color: "var(--text-Color)" }}>{t("Registration.reset_password")}</span></p>
                </Link>
                <input type="submit" value={t("Registration.signin_btn_text")} className="btn-registration solid" />
            </form>
            <form className="right-registration-card" onSubmit={(event) => { signUpHandler(event) }}>
                <h2 className="title">{t("Registration.signup_btn_text")}</h2>
                <RegistrationInput className="input-field" iClassName="bx bx-user" inputClassName={"px-3"} type="text" placeholder={t("Registration.username")} error={userNameError} onChange={setUserName} />
                <RegistrationInput className="input-field" iClassName="bx bx-envelope" inputClassName={"px-3"} type="text" placeholder={t("Registration.email")} error={signUpEmailError} onChange={setEmail} />
                <RegistrationInput className="input-field" iClassName="bx bx-lock-alt" inputClassName={"px-3"} type="password" placeholder={t("Registration.password")} error={signUpPasswordError} onChange={setPassword} />
                <RegistrationInput className="input-field" iClassName="bx bx-lock-alt" inputClassName={"px-3"} type="password" placeholder={t("Registration.confirm_password")} error={confirmPasswordError} onChange={setConfirmPassword} />
                <input type="submit" value={t("Registration.go_signup_info")} className="btn-registration solid" />
            </form>
        </RegistrationForm>
    )
}

export default Registration
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


const Registration = () => {

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
            hText: "One of Us?",
            infoText: "Welcome to Scriptoria! Please enter your username and password to access your account. If you don't have an account yet, you can sign up for free.",
            btnClassName: "btn-registration",
            btnId: "sign-up-btn",
            onClick: handleRightCard,
            btnText: "Sign up"
        },
        {
            className: "panel right-panel",
            hText: "One of Us?",
            infoText: "Welcome to Scriptoria! Please enter your username and password to access your account. If you don't have an account yet, you can sign up for free.",
            btnClassName: "btn-registration",
            btnId: "sign-in-btn",
            onClick: handleLeftCard,
            btnText: "Sign in"
        }
    ];
    return (
        <RegistrationForm panels={panelsData} registrationMode={registrationMode}>
            <form className="left-registration-card" onSubmit={(event) => signInHandler(event)}>
                <h2 className="title">Sign In</h2>
                <RegistrationInput className="input-field" iClassName="bx bx-envelope" inputClassName={"px-3"} type="text" placeholder="Email" error={signInEmailError} onChange={setEmail} />
                <RegistrationInput className="input-field" iClassName="bx bx-lock-alt" inputClassName={"px-3"} type="password" placeholder="Password" error={signInPasswordError} onChange={setPassword} />
                <p className='registration-input-error'>{signInError}</p>
                <Link to={`/GetEmail`} target="" style={{ textDecoration: "none", color: "rgb(33,33,33)" }}>
                    <p>Forgot your password? <span style={{ textDecoration: "underline", color: "var(--text-Color)" }}>Reset password</span></p>
                </Link>
                <input type="submit" value="Sign In" className="btn-registration solid" />
            </form>
            <form className="right-registration-card" onSubmit={(event) => { signUpHandler(event) }}>
                <h2 className="title">Sign Up</h2>
                <RegistrationInput className="input-field" iClassName="bx bx-user" inputClassName={"px-3"} type="text" placeholder="User Name" error={userNameError} onChange={setUserName} />
                <RegistrationInput className="input-field" iClassName="bx bx-envelope" inputClassName={"px-3"} type="text" placeholder="Email" error={signUpEmailError} onChange={setEmail} />
                <RegistrationInput className="input-field" iClassName="bx bx-lock-alt" inputClassName={"px-3"} type="password" placeholder="Password" error={signUpPasswordError} onChange={setPassword} />
                <RegistrationInput className="input-field" iClassName="bx bx-lock-alt" inputClassName={"px-3"} type="password" placeholder="Confirm Password" error={confirmPasswordError} onChange={setConfirmPassword} />
                <input type="submit" defaultValue="Sign Up" className="btn-registration solid" />
            </form>

        </RegistrationForm>
    )
}

export default Registration
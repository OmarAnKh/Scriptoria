import { useState } from "react";
import ConnectButton from "../connect-button/ConnectButton";
import JoinInput from "../join-input/JoinInput";
import validator from "validator";
import "./SignUp.css"
import { Link } from "react-router-dom";
import SignUpInfo from "../sign-up-info/SignUpInfo";
import { findAccount } from "../../api/accountApi";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("rgb(33,33,33)")
    const [user, setUser] = useState({})
    const [goToInfo, setGoToInfo] = useState(false)

    const signUpHandler = async () => {

        let validatorCounter = 0;
        if (validator.isEmail(email)) {
            validatorCounter++;
            setEmailError("rgb(33,33,33)");
        }
        else {
            setEmailError("red");
            return;
        }
        let account = await findAccount({ email }) | {}

        if (account.message) {
            setError("Email already exists")
            if (validatorCounter > 0) {
                validatorCounter--;
            }
        }
        account = await findAccount({ userName }) | {}
        if (account.message) {
            setError("user name already exists")
            if (validatorCounter > 0) {
                validatorCounter--;
            }
        }
        if (password === confirmPassword) {
            validatorCounter++;
        }
        else {
            setError("The password and confirmed password do not match")
            if (validatorCounter > 0) {
                validatorCounter--;
            }
        }
        if (validatorCounter !== 2) {
            setGoToInfo(false)
        }
        else {
            setError(null)
            setEmailError("")
            setGoToInfo(true)
            const user = {
                userName, email, password
            }
            setUser(user)
        }
    }
    return (
        (!goToInfo) ?
            <>
                <div className="container d-flex justify-content-center align-items-center my-3">
                    <div className="row">
                        <div className="col-12 col-lg-6 box-1 d-flex justify-content-center align-items-center text-center">
                            <div>
                                <span className="box1-header">Welcome Back!</span>
                                <p className="box1-text">sign in to continue your creativity with <span className="Scriptoria">Scriptoria</span></p>
                                <Link to={`/SignIn`} className="card-text" target="">
                                    <button className="btn login-button">Login</button>
                                </Link>
                            </div>
                            <div className="side-box1"></div>
                        </div>
                        <div className="col-12 col-lg-6 box-2 d-flex flex-column align-items-center text-center">
                            <div>
                                <span className="box2-header">Create Account</span>
                            </div>
                            <div>
                                <form>
                                    <JoinInput title="User name" method={setUserName} type="text" />
                                    <JoinInput title="email" method={setEmail} color={emailError} type="email" />
                                    <JoinInput title="password" method={setPassword} type="password" />
                                    <JoinInput title="confirm password" method={setConfirmPassword} type="password" />
                                </form>
                            </div>
                            <button className="btn signup-btn" onClick={signUpHandler}>Sign Up</button>
                            <p className="error-text">{error}</p>
                            <div className="hr-div">
                                <hr className="signup-hr" />
                                <span>Or connect with</span>
                            </div>
                            <div className="connect-button">
                                <ConnectButton icon="bi bi-google" />
                                <ConnectButton icon="bi bi-apple" />
                                <ConnectButton icon="bi bi-facebook" />
                            </div>
                        </div>
                    </div>
                </div>
            </> : <SignUpInfo user={user} setGoToInfo={setGoToInfo} setError={setError} />
    )
}

export default SignUp;
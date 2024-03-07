import { useState } from "react";
import ConnectButton from "../connect-button/ConnectButton";
import JoinInput from "../join-input/JoinInput";
import validator from "validator";
import "./SignUp.css"

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState({})

    const signUpHandler = () => {
        let validatorCounter = 0;
        if (validator.isEmail(email)) {
            validatorCounter++;
        }
        if (password === confirmPassword) {
            validatorCounter++;
        }
        if (validatorCounter !== 2) {
            setError("Invalid data");
        }
        if (error !== "") {
            setError("")
            const user = {
                name, email, password
            }
            setUser(user)
        }
    }
    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center my-3">
                <div className="row">
                    <div className="col-12 col-lg-6 box-1 d-flex justify-content-center align-items-center text-center">
                        <div>
                            <span className="box1-header">Welcome Back!</span>
                            <p className="box1-text">sign in to continue your creativity with spectoria</p>
                            <button className="btn login-button">Login</button>
                        </div>
                        <div className="side-box1"></div>
                    </div>
                    <div className="col-12 col-lg-6 box-2 d-flex flex-column align-items-center text-center">
                        <div>
                            <span className="box2-header">Create Account</span>
                        </div>
                        <div>
                            <form>
                                <JoinInput title="name" method={setName} />
                                <JoinInput title="email" method={setEmail} />
                                <JoinInput title="password" method={setPassword} />
                                <JoinInput title="confirm password" method={setConfirmPassword} />
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
        </>
    )
}

export default SignUp;
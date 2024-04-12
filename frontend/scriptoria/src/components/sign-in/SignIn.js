import logo from "../../img/scriptoria-logo.png";
import JoinInput from "../join-input/JoinInput";
import validator from "validator";
import "./SignIn.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveDocument } from "../../api/API's";
import useAuth from "../../hooks/useAuth";
const SignIn = () => {

    const { setAuth } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState("rgb(33,33,33)");
    const [passwordValid, setPasswordValid] = useState("rgb(33,33,33)");
    const [credentialsValidation, setCredentialsValidation] = useState("")
    const navigate = useNavigate()
    let user = {}
    const signInHandler = async () => {
        if (!validator.isEmail(email) && password === "") {
            setPasswordValid("red");
            setEmailValid("red");
            setCredentialsValidation("Something went wrong")
            return;
        }
        if (!validator.isEmail(email)) {
            setEmailValid("red");
            setPasswordValid("rgb(33,33,33)");

            setCredentialsValidation("Something went wrong")
            return;
        }
        if (password === "") {
            setPasswordValid("red");
            setEmailValid("rgb(33,33,33)");
            setCredentialsValidation("Something went wrong")
            return;
        }
        setPasswordValid("rgb(33,33,33)");
        setEmailValid("rgb(33,33,33)");
        setCredentialsValidation("")
        user = {
            email,
            password
        }
        const res = await saveDocument("signIn", user)
        if (res.status === 400) {
            setPasswordValid("red");
            setEmailValid("red");
            setCredentialsValidation("Something went wrong")
            return;
        }
        const token = res.token
        const userInfo = res.user.userName
        setAuth({ userName: userInfo, token })
        navigate("/")
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center my-3 signInBook" style={{ minHeight: "90vh" }}>
                <div className="row ">
                    <div className="col-lg-6 box-3 d-flex flex-column align-items-center text-center">
                        <img src={logo} alt="Scriptoria logo" id="logo" className="img-fluid" />
                        <div>
                            <span className="box1-header Scriptoria" >Scriptoria</span>
                            <form>
                                <JoinInput title="Your Email" method={setEmail} color={emailValid} type="email" />
                                <JoinInput title="Your Password" method={setPassword} type="password" color={passwordValid} />
                                <p>{credentialsValidation} </p>
                            </form>
                            <button className="btn login-button2" onClick={() => signInHandler()}>Sign In</button>
                            <Link to={`/SignUp`} className="card-text" target="" style={{ textDecoration: "none", color: "rgb(33,33,33)" }}>
                                <p>Don't have an account? <span style={{ textDecoration: "none", color: "white", display: "inline-block", marginBottom: "0%" }}>Sign up</span></p>
                            </Link>
                            <Link to={`/GetEmail`} className="card-text" target="" style={{ textDecoration: "none", color: "rgb(33,33,33)" }}>
                                <p>Forgot your password? <span style={{ textDecoration: "none", color: "white", display: "inline-block", marginBottom: "0%" }}>Reset password</span></p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 box-4 d-flex  align-items-center text-center">
                        <div className="side-box2"></div>
                        <div className="textBody">
                            <span className="box2-header">Hello Friend !</span>
                            <p className="box1-text">Are you Ready to start your Scriptoria journey?<br></br>
                                Join us now<br></br>
                                to unleash your creative potential<br></br>
                                and<br></br>
                                be part of our creative  community</p>
                            <Link to={`/SignUp `} className="card-text" target="" >
                                <button className="btn login-button1">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default SignIn;

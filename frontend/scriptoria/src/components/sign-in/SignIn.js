import logo from "../../img/scriptoria-logo.png";
import JoinInput from "../join-input/JoinInput";
import validator from "validator";
import "./SignIn.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState("rgb(33,33,33)");
    const [passwordValid, setPasswordValid] = useState("rgb(33,33,33)");
    let user = {}
    const signInHandler = async () => {
        if (!validator.isEmail(email)) {
            setEmailValid("red");
            return;
        }
        if (password === "") {
            setPasswordValid("red");
            return;
        }
        setPasswordValid("rgb(33,33,33)");
        setEmailValid("rgb(33,33,33)");
        user = {
            email,
            password
        }
        try {
            const response = await fetch('http://localhost:5000/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }

        console.log("Email is valid:");
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center my-3 signInBook">
                <div className="row">
                    <div className="col-lg-6 box-3 d-flex flex-column align-items-center text-center">
                        <img src={logo} alt="Scriptoria logo" id="logo" className="img-fluid" />
                        <div>
                            <span className="box1-header">Scriptoria</span>
                            <form>
                                <JoinInput title="Your Email" method={setEmail} color={emailValid} type="text" />
                                <JoinInput title="Your Password" method={setPassword} type="password" color={passwordValid} />
                            </form>
                            <button className="btn login-button2" onClick={() => signInHandler()}>Sign In</button>
                            <p>you don’t have an account ?<a href="#" style={{ textDecoration: "none", color: "white" }} >sign up</a>  </p>
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
                            <Link to={`/SingUp `} className="card-text" target="" >
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

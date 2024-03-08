import { Link } from "react-router-dom";
import JoinInput from "../join-input/JoinInput";
import logo from "../../img/scriptoria-logo.png";
import content from "../../img/content.png";
import openBook from "../../img/open-book.png";
import signature from "../../img/signature.png"
import "./SignUpInfo.css"
import JoyButton from "../joy-button/JoyButton";
import { useState } from "react";
import { createAccount } from "../../api/accountApi.js"

const SignUpInfo = (props) => {
    const [displayName, setDisplayName] = useState("");
    const [country, setCountry] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [joyType, setJoyType] = useState("reader")
    let user = { ...props.user }

    const signUpInfoHandler = async () => {
        user.displayName = displayName;
        user.content = country;
        user.dateOfBirth = dateOfBirth;
        user.gender = gender;
        user.type = joyType;
        await createAccount(user);
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center my-3 signInBook">
                <div className="row">
                    <div className="col-lg-6 box-3 d-flex flex-column align-items-center text-center">
                        <img src={logo} alt="Scriptoria logo" id="logo" className="img-fluid" />
                        <span className="scriptoria-text-info">Scriptoria</span>
                        <div className="box1-text">
                            <p className="info-text">
                                <span className="welcome-word-info">Welcome</span> "spec.user"<br />
                                To get the best<br />
                                experience,<br />
                                we want to know a bit<br />
                                about you!
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 box-4 d-flex align-items-center text-center">
                        <div className="side-box2"></div>
                        <div className="align-items-center text-center">
                            <form>
                                <JoinInput title="Display Name" type="TEXT" backColor="#fae2e2" backgroundColor="#fae2e2" method={setDisplayName} />
                                <JoinInput title="Your country" type="TEXT" backColor="#fae2e2" backgroundColor="#fae2e2" method={setCountry} />
                                <JoinInput title="Your Birthday" type="date" backColor="#fae2e2" backgroundColor="#fae2e2" method={setDateOfBirth} />
                                <JoinInput title="gender" type="text" backColor="#fae2e2" backgroundColor="#fae2e2" method={setGender} />
                            </form>
                            <span className="joy-text">Do you find joy in</span>
                            <div className="my-2">
                                <JoyButton icon={openBook} method={setJoyType} type="reader" />
                                <JoyButton icon={content} method={setJoyType} type="both" />
                                <JoyButton icon={signature} method={setJoyType} type="writer" />
                            </div>
                            <div>
                                <Link to={`/`} className="card-text" target="" >
                                    <button className="btn login-button1" style={{ background: "#d2a7b2" }} onClick={signUpInfoHandler}>******</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SignUpInfo
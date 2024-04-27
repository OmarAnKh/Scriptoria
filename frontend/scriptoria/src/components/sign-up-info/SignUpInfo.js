import { useNavigate } from "react-router-dom";
import JoinInput from "../join-input/JoinInput";
import logo from "../../img/scriptoria-logo.png";
import content from "../../img/content.png";
import openBook from "../../img/open-book.png";
import signature from "../../img/signature.png"
import "./SignUpInfo.css"
import JoyButton from "../joy-button/JoyButton";
import { useState } from "react";
import SignUpInfoSelect from "./SignUpInfoSelect.js";

const SignUpInfo = (props) => {
    const [displayName, setDisplayName] = useState("");
    const [region, setRegion] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [joyType, setJoyType] = useState("reader");
    const navigate = useNavigate();

    let user = { ...props.user }

    const signUpInfoHandler = async () => {
        user.displayName = displayName;
        user.region = region;
        user.dateOfBirth = dateOfBirth;
        user.gender = gender;
        user.type = joyType;
        // const response = await account("SignUp", user);
        // if (response.status === 400) {
        //     props.setGoToInfo(false);
        //     props.setError("Email or user name already taken");
        //     navigate(`/SignUp`);
        //     return console.log(response);
        // }
        // document.cookie = "token=" + response.token + ";";
        // document.cookie = "userInfo=" + response.user + ";";
        navigate(`/SignUpVerificationCode`, { state: { user } });
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center my-3 signInBook-info">
                <div className="row">
                    <div className="col-lg-6 box-3-info d-flex flex-column align-items-center text-center">
                        <img src={logo} alt="Scriptoria logo" id="logo" className="img-fluid" />
                        <span className="scriptoria-text-info Scriptoria">Scriptoria</span>
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
                    <div className="col-lg-6 box-4-info d-flex align-items-center text-center">
                        <div className="side-box2-info"></div>
                        <div className="align-items-center text-center">
                            <form>
                                <JoinInput title="Display Name" type="TEXT" backColor="#fae2e2" backgroundColor="#fae2e2" method={setDisplayName} />
                                <SignUpInfoSelect title="countrys" method={setRegion} value={region} />
                                <JoinInput title="Your Birthday" type="date" backColor="#fae2e2" backgroundColor="#fae2e2" method={setDateOfBirth} />
                                <SignUpInfoSelect title="gender" method={setGender} value={gender} />
                            </form>
                            <span className="joy-text">Do you find joy in</span>
                            <div className="my-2">
                                <JoyButton icon={openBook} method={setJoyType} type="reader" />
                                <JoyButton icon={content} method={setJoyType} type="both" />
                                <JoyButton icon={signature} method={setJoyType} type="writer" />
                            </div>
                            <div>
                                <button className="btn login-button1" style={{ background: "#d2a7b2" }} onClick={signUpInfoHandler}>******</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpInfo
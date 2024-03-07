import { Link } from "react-router-dom";
import JoinInput from "../join-input/JoinInput";
import logo from "../../img/scriptoria-logo.png";
import content from "../../img/content.png";
import openBook from "../../img/open-book.png";
import signature from "../../img/signature.png"
import "./SignUpInfo.css"
import JoyButton from "../joy-button/JoyButton";


const SignUpInfo = () => {
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
                                <JoinInput title="Your country" type="TEXT" />
                                <JoinInput title="Your Birthday" type="date" />
                            </form>
                            <span className="joy-text">Do you find joy in</span>
                            <div className="my-2">
                                <JoyButton icon={openBook} />
                                <JoyButton icon={content} />
                                <JoyButton icon={signature} />
                            </div>
                            <div>
                                <Link to={`/`} className="card-text" target="" >
                                    <button className="btn login-button1" style={{ background: "#d2a7b2" }}>******</button>
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
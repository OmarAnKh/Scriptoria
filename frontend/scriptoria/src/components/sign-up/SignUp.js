import ConnectButton from "../connect-button/ConnectButton";
import JoinInput from "../join-input/JoinInput";
import "./SignUp.css"

const SignUp = () => {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center my-3">
                <div className="row">
                    <div className="col-lg-6 box-1 d-flex justify-content-center align-items-center text-center">
                        <div>
                            <span className="box1-header">Welcome Back!</span>
                            <p className="box1-text">sign in to continue your creativity with spectoria</p>
                            <button className="btn login-button">Login</button>
                        </div>
                        <div className="side-box1"></div>
                    </div>
                    <div className="col-lg-6 box-2 d-flex flex-column align-items-center text-center">
                        <div>
                            <span className="box2-header">Create Account</span>
                        </div>
                        <div>
                            <JoinInput title="name" />
                            <JoinInput title="email" />
                            <JoinInput title="password" />
                            <JoinInput title="confirm password" />
                        </div>
                        <button className="btn signup-btn">Sign Up</button>
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
import logo from "../../img/scriptoria-logo.png"
import "./SignIn.css"
import { useState } from "react"

const SignIn = () => {

    return (
        <div className="container">
            <div className="login">
                <div className="row">
                    <div className="left-side col-md-6">
                        <div className="logo">
                            <img src={logo} alt="Scriptoria logo" id="logo" className="img-fluid" />
                        </div>
                        <p id="logoName" className="logoName" style={{ fontSize: 'xx-large' }}> Scriptoria </p>
                        <div className="form">
                            <div className="inputBox">
                                <input placeholder="Write here..." type="text" required="" className="input-info form-control" />
                                <b >your email :</b>
                                <input placeholder="Write here..." type="text" required="" className="input-info form-control" />
                                <b>your password :</b>
                            </div>
                            <br />
                            <button className="btn btn-lg active sign-in-btn-color m-3" >Sign in</button>
                        </div>
                        <div className="signup-link">
                            <p>Forgot your password?</p>
                        </div>
                    </div>
                    <div className="right-side col-md-6">
                        <div className="form">
                            <p>
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Nulla non sem lectus. Aliquam dui felis
                                mollis sit amet nulla sit amet,
                                suscipit dignissim arcu. Mauris eleifend vulputate odio a ullamcorper.
                            </p>
                        </div>
                        <div className="signup-link">
                            <p>Forgot your password?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
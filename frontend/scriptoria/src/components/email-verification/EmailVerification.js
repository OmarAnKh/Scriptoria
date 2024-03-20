import "./EmailVerification.css"
import EmailVerificationButton from "./EmailVerificationButton";
import EmailVerificationFormBody from "./EmailVerificationFormBody";

const EmailVerification = (props) => {
    return (
        <div className="container d-flex justify-content-center align-items-center ">
            <div className="row justify-content-center mt-5  text-center">
                <div className="col-md-6">
                    <div className="card email-verification-body">
                        <div className="card-body">
                            <span className="Scriptoria Scriptoria-title my-3">Scriptoria</span>
                            <br />
                            <span>{props.cardType}</span>
                            <p className="my-3 card-text">
                                {props.text}
                            </p>
                            <form>
                                <EmailVerificationFormBody type={props.type} placeholder={props.inputPlaceholder} methodOnChange={props.methodOnChange} />
                                <EmailVerificationButton title={props.buttonTitle} methodOnClick={props.methodOnClick} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EmailVerification;
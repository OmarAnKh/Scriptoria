import { useState } from "react";
import CountUp from "react-countup";

const EmailVerificationButton = (props) => {
    const [disabled, setDisabled] = useState(false);
    const changeDisabled = () => {
        setTimeout(() => {
            setDisabled(false);
        }, 40000)
    }
    return (
        <button type="submit" className="btn btn-primary btn-block submit-button" disabled={disabled} onClick={(event) => {
            props.methodOnClick()
            if (props.timer) {
                setDisabled(true);
                changeDisabled();
            }
            event.preventDefault();
        }}>
            {props.title}

            {props.timer && disabled ? <>(<CountUp
                start={0}
                end={60}
                duration={60}
            />)</> : <></>}
        </button>
    )
}

export default EmailVerificationButton;
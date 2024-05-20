import { useEffect, useState } from "react";

const EmailVerificationButton = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (timer < 0) {
            setDisabled(false);
            return;
        }
        if (disabled) {
            setTimeout(() => {
                setTimer(timer - 1)
            }, 1000)
        }
        return () => clearTimeout()
    }, [timer])

    return (
        <button type="submit" className="btn btn-primary btn-block submit-button" disabled={disabled} onClick={(event) => {
            props.methodOnClick()
            if (props?.timer) {
                setDisabled(true);
                setTimer(60);
            }
            event.preventDefault();
        }}>
            {props.title}

            {props.timer && disabled ? <> in:{timer}</> : <></>}
        </button>
    )
}

export default EmailVerificationButton;
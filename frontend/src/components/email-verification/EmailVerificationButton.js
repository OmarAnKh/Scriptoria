

const EmailVerificationButton = (props) => {
    return (
        <button type="submit" className="btn btn-primary btn-block submit-button" onClick={(event) => {
            props.methodOnClick()
            event.preventDefault();
        }}>
            {props.title}
        </button>
    )
}

export default EmailVerificationButton;
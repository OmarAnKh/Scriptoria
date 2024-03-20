

const EmailVerificationInput = (props) => {
    const handelChange = (event) => {
        props.methodOnChange(event.target.value)
    }
    return (
        <div className="form-group my-3">
            <input
                type={props.type}
                className="form-control input-form"
                placeholder={props.placeholder}
                onChange={(event) => {
                    handelChange(event)
                }}
            />
        </div>
    )
}

export default EmailVerificationInput;
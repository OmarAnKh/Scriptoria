import EmailVerificationInput from "./EmailVerificationInput";


const EmailVerificationFormBody = (props) => {
    if (props.type === "password") {
        return (
            <>
                <EmailVerificationInput type={props.type} placeholder={props.placeholder}
                    methodOnChange={props.methodOnChange[0]}
                />
                <EmailVerificationInput type={props.type} placeholder="confirm password"
                    methodOnChange={props.methodOnChange[1]}
                />
            </>
        )
    }
    return (
        <EmailVerificationInput type={props.type} placeholder={props.placeholder}
            methodOnChange={props.methodOnChange}
        />
    )
}

export default EmailVerificationFormBody;
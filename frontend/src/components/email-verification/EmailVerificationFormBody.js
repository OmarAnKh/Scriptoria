import EmailVerificationInput from "./EmailVerificationInput";


const EmailVerificationFormBody = (props) => {
    if (props.type === "password") {
        return (
            <>
                <EmailVerificationInput
                    type={props.type}
                    placeholder={props.placeholder}
                    methodOnChange={props.methodOnChange[0]}
                    inputColor={props.inputColor}
                />
                <EmailVerificationInput
                    type={props.type}
                    placeholder="confirm password"
                    methodOnChange={props.methodOnChange[1]}
                    inputColor={props.inputColor}
                    inputError={props.inputError}
                />
            </>
        )
    }
    return (
        <EmailVerificationInput
            type={props.type}
            placeholder={props.placeholder}
            methodOnChange={props.methodOnChange}
            inputColor={props.inputColor}
            inputError={props.inputError}
        />
    )
}

export default EmailVerificationFormBody;
import { useState } from "react";


const EmailVerificationInput = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handelChange = (event) => {
        props.methodOnChange(event.target.value)
    }
    if (props.type !== "password") {
        return (
            <div className="form-group my-3" >
                <input
                    style={{ borderColor: props.inputColor }}
                    type={props.type}
                    className="form-control input-form"
                    placeholder={props.placeholder}
                    onChange={(event) => {
                        handelChange(event)
                    }}
                    autoComplete="true"
                />
                <span>
                    {props.inputError}
                </span>
            </div>

        )
    }
    return (<>
        <div className="form-group my-3" style={{ position: 'relative', display: 'inline-block' }} >
            <input
                style={{ borderColor: props.inputColor, paddingRight: '30px' }}
                type={showPassword ? "text" : "password"}
                className="form-control input-form"
                placeholder={props.placeholder}
                onChange={(event) => {
                    handelChange(event)
                }}
                autoComplete="true"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', top: '45%', right: '5px', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16" style={{ position: 'absolute', top: '40%', right: '10px', transform: 'translateY(-50%)' }}>
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
            </button>
        </div>
        <span>
            {props.inputError}
        </span></>
    )
}

export default EmailVerificationInput;
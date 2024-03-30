import { useLocation, useNavigate } from "react-router-dom";
import EmailVerification from "../email-verification/EmailVerification";
import { useState } from "react";
import { editPassword } from "../../api/accountApi";
import { saveDocument } from "../../api/API's";

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { email } = location.state || {};
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [inputColor, setInputColor] = useState("#cad0ff")
    const [inputError, setInputError] = useState("")
    const passwordHandler = async () => {
        if (
            password.length < 6 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/\d/.test(password) ||
            password !== confirmPassword
        ) {
            setInputError("Password must be at least 6 characters long, contain at least one uppercase letter, contain at least one lowercase letter and contain at least one number")
            setInputColor("red")
            return
        }
        if (password === confirmPassword) {
            try {
                const user = {
                    email,
                    password
                }
                await editPassword("reset/password", user)
                const res = await saveDocument("signIn", user)
                if (res.status === 400) {
                    return;
                }
                navigate("/")
                return
            } catch (error) {
                return console.log(error)
            }

        }
        setInputError("Please make sure that the password and the confirm password match")
        setInputColor("red")
    }
    if (email) {
        return (
            <div>
                <EmailVerification
                    cardType="Reset your password"
                    type="password"
                    text="please choose a strong password"
                    inputPlaceholder="Password"
                    methodOnChange={[setPassword, setConfirmPassword]}
                    buttonTitle="Save new password"
                    methodOnClick={passwordHandler}
                    inputColor={inputColor}
                    inputError={inputError}
                />
            </div>
        )
    }
}

export default ResetPassword
import { useLocation, useNavigate } from "react-router-dom";
import EmailVerification from "../email-verification/EmailVerification";
import { useState } from "react";
import { editPassword } from "../../api/accountApi";
import { saveDocument } from "../../api/API's";
import { useTranslation } from 'react-i18next';
const ResetPassword = () => {
    const { t } = useTranslation()
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
            setInputError(t("ResetPassword.InputError_password_criteria"))
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
        setInputError(t("ResetPassword.InputError_confirm_password"))
        setInputColor("red")
    }
    if (email) {
        return (
            <div>
                <EmailVerification
                    cardType={t("ResetPassword.cardType")}
                    type="password"
                    text={t("ResetPassword.text")}
                    inputPlaceholder={t("ResetPassword.inputPlaceholder")}
                    methodOnChange={[setPassword, setConfirmPassword]}
                    buttonTitle={t("ResetPassword.buttonTitle")}
                    methodOnClick={passwordHandler}
                    inputColor={inputColor}
                    inputError={inputError}
                />
            </div>
        )
    }
}

export default ResetPassword
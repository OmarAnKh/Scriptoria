import EmailVerification from "../email-verification/EmailVerification"
import { useState } from "react"
import validator from "validator"
import { findAccount } from "../../api/accountApi"
import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import Navbar from "../navbar/Navbar"

const GettingEmail = () => {
    const { t } = useTranslation();

    const [email, setEmail] = useState("")
    const [inputColor, setInputColor] = useState("#cad0ff")
    const [inputError, setInputError] = useState("")
    const navigate = useNavigate()
    const clickHandler = async () => {
        if (!validator.isEmail(email)) {
            setInputColor("red")
            setInputError(t("GettingEmail.InputError_valid_email"))
            return
        }
        const res = await findAccount({ email })
        console.log(res)
        if (res.status === 404) {
            setInputColor("red")
            setInputError(t("GettingEmail.InputError_not_exsist"))
            return
        }
        navigate(`/EmailVerifing/${email}`)
    }

    return (
        <>
            <Navbar />
            <EmailVerification
                cardType={t("GettingEmail.cardType")}
                type="email"
                text={t("GettingEmail.text")}
                inputPlaceholder={t("GettingEmail.E_mail")}
                methodOnChange={setEmail}
                buttonTitle={t("GettingEmail.get_code")}
                methodOnClick={clickHandler}
                inputColor={inputColor}
                inputError={inputError}
            />
        </>
    )
}
export default GettingEmail
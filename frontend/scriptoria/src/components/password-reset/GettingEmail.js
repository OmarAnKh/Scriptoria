import EmailVerification from "../email-verification/EmailVerification"
import { useState } from "react"
import validator from "validator"
import { findAccount } from "../../api/accountApi"
import { useNavigate } from "react-router-dom"


const GettingEmail = () => {
    const [email, setEmail] = useState("")
    const [inputColor, setInputColor] = useState("#cad0ff")
    const [inputError, setInputError] = useState("")
    const navigate = useNavigate()
    const clickHandler = async () => {
        if (!validator.isEmail(email)) {
            setInputColor("red")
            setInputError("Please enter a valid email")
            return
        }
        const res = await findAccount( {email})
        console.log(res)
        if (res.status === 404) {
            setInputColor("red")
            setInputError("There is no account with this email on our website ")
            return
        }
        navigate(`/EmailVerifing/${email}`)
    }

    return (
        <EmailVerification
            cardType="Account recovery"
            type="email"
            text="to reset your password please provide your email address se we can send you a verification code"
            inputPlaceholder="E-mail"
            methodOnChange={setEmail}
            buttonTitle="Get code"
            methodOnClick={clickHandler}
            inputColor={inputColor}
            inputError={inputError}
        />

    )
}
export default GettingEmail
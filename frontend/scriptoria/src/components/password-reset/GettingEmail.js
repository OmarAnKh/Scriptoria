import EmailVerification from "../email-verification/EmailVerification"
import { useState } from "react"
import validator from "validator"
import { getAccountViaEmail } from "../../api/accountApi"


const GettingEmail = () => {
    const [email, setEmail] = useState("")
    const clickHandler = async () => {
        if (!validator.isEmail(email)) {
            return
        }
        const res = await getAccountViaEmail("user/find", email)
        if (res.status === 404) {
            console.log("email not found")
        }
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
        />

    )
}
export default GettingEmail
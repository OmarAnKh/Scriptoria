import { useLocation, useNavigate } from "react-router-dom";
import EmailVerification from "../email-verification/EmailVerification";
import { useEffect, useState } from "react";
import { saveDocument } from "../../api/API's";
import useAuth from "../../hooks/useAuth"
import Cookies from "js-cookie"
import { useTranslation } from 'react-i18next';
import useSendEmail from "../../hooks/useSendEmail";


const SignUpVerificationCode = () => {
    const { sendMail } = useSendEmail();
    const { setAuth } = useAuth();
    const [code, setCode] = useState("");
    const [correctCode, setCorrectCode] = useState(null);
    const [inputColor, setInputColor] = useState("#cad0ff")
    const [inputError, setInputError] = useState("")
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { accountInfo } = location.state || {};

    useEffect(() => {
        const generateCode = () => {
            let allChar = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789"];
            let generatedCode = "";
            if (!correctCode) {
                for (let i = 0; i < 4; i++) {
                    let indexForAllChar = Math.floor(Math.random() * allChar.length);
                    let temp = allChar[indexForAllChar];
                    generatedCode += temp[Math.floor(Math.random() * temp.length)];
                }
                setCorrectCode(generatedCode);
            }
        };
        generateCode();
        if (correctCode) {
            sendMail(accountInfo.email, correctCode)
        }
    }, [correctCode]);

    const clickHandler = async () => {
        if (correctCode === code) {
            const response = await saveDocument("SignUp", accountInfo);
            if (response.status === 400) {
                navigate(`/SignUp`);
                return console.log(response);
            }
            const userName = accountInfo.userName;
            const token = response.token;

            setAuth({ userName, token, userInfo: accountInfo })
            Cookies.set('flag', true)
            navigate(`/`);
        }
    };
    const codeResendHandler = () => {
        sendMail(accountInfo.email, correctCode)
    }
    return (
        <>
            <EmailVerification
                cardType={t("EmailVerifing.signup_verification_card_type")}
                text={`${t("EmailVerifing.signup_verification_code")} ${accountInfo.email}`}
                type="text"
                inputPlaceholder={t("EmailVerifing.signup_verification_enter_code")}
                buttonTitle={t("EmailVerifing.signup_verification_code_next")}
                buttonTitle2={t("EmailVerifing.buttonTitle2")}
                methodOnChange={setCode}
                methodOnClick={clickHandler}
                methodOnClick2={codeResendHandler}
                nputColor={inputColor}
                inputError={inputError}
            />
        </>
    );
};

export default SignUpVerificationCode;

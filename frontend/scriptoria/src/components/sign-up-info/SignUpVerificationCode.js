import { useLocation, useNavigate } from "react-router-dom";
import EmailVerification from "../email-verification/EmailVerification";
import { useEffect, useState } from "react";
import { sendEmail } from "../../api/API's";
import { saveDocument } from "../../api/API's";
import useAuth from "../../hooks/useAuth"

const SignUpVerificationCode = () => {
    const { setAuth } = useAuth();
    const [code, setCode] = useState("");
    const [correctCode, setCorrectCode] = useState(null);
    const [inputColor, setInputColor] = useState("#cad0ff")
    const [inputError, setInputError] = useState("")
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {};

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
        const emailDetails = {
            email: user.email,
            codeGenerated: correctCode
        };
        if (correctCode) {
            sendEmail("account/recovery", emailDetails)
        }
    }, [correctCode]);

    const clickHandler = async () => {
        if (correctCode === code) {
            const response = await saveDocument("SignUp", user);
            if (response.status === 400) {
                navigate(`/SignUp`);
                return console.log(response);
            }
            const userName = user.userName;
            const token = response.token;

            setAuth({ userName, token, userInfo: user })

            navigate(`/`);
        }
    };

    return (
        <>
            <EmailVerification
                cardType="Email Verification"
                text={`An email with Verification code was just send to ${user.email}`}
                type="text"
                inputPlaceholder="Enter code"
                buttonTitle="Next"
                methodOnChange={setCode}
                methodOnClick={clickHandler}
                nputColor={inputColor}
                inputError={inputError}
            />
        </>
    );
};

export default SignUpVerificationCode;

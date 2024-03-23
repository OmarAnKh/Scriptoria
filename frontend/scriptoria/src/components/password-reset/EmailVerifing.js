import { useState, useEffect } from "react";
import validator from "validator";
import { getAccountViaEmail, sendEmail } from "../../api/accountApi";
import { useParams } from "react-router-dom";
import EmailVerification from "../email-verification/EmailVerification";
import { useNavigate } from "react-router-dom"


const EmailVerifing = () => {
    const { email } = useParams();
    const [validEmail, setValidEmail] = useState(undefined);
    const [userCode, setUserCode] = useState("")
    const [generatedCode, setGeneratedCode] = useState("")

    const [inputColor, setInputColor] = useState("#cad0ff")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        async function checkEmailValidity() {
            if (!validator.isEmail(email)) {
                setValidEmail(undefined);
                return;
            }

            try {
                const res = await getAccountViaEmail("find/email", email);
                if (res.status === 404) {
                    setValidEmail(undefined);
                } else {
                    setValidEmail(email);
                }
            } catch (error) {
                console.error("Error occurred while checking email validity:", error);
                setValidEmail(undefined);
            }
        }
        generateCode();
        checkEmailValidity();
    }, [email]);

    useEffect(() => {
        if (validEmail) {
            sendVerificationCode();

        }
    },);

    const generateCode = () => {
        let allChar = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789"];
        let code = "";
        for (let i = 0; i < 4; i++) {
            let indexForAllChar = Math.floor(Math.random() * allChar.length);
            let temp = allChar[indexForAllChar]
            code += temp[Math.floor(Math.random() * temp.length)]
        }
        setGeneratedCode(code)
    }

    const sendVerificationCode = async () => {
        const emailDetails = {
            email,
            codeGenerated: generatedCode
        };
        try {
            await sendEmail("account/recovery", emailDetails);
            console.log("Email sent successfully");
        } catch (error) {
            console.error("Error occurred while sending email:", error);
        }
    };

    const compareHandler = () => {
        if (userCode === generatedCode) {
            navigate(`/ResetPassword`, { state: { email } })
            return
        }
        setInputColor("red")
        setError("invalid code")
    }
    if (validEmail !== undefined) {
        return (
            <EmailVerification
                cardType="Account recovery"
                type="email"
                text="Please enter the code that was sent to your email"
                inputPlaceholder="Verification code"
                methodOnChange={setUserCode}
                buttonTitle="Verify my code"
                methodOnClick={compareHandler}
                inputColor={inputColor}
                error={error}
            />
        );
    } else {
        return <div>Email is not valid or does not exist.</div>;
    }
};

export default EmailVerifing;

import { sendEmail } from "../api/API's";

const useSendEmail = () => {
    const sendMail = async (email, content) => {

        const emailDetails = {
            email,
            content
        };

        try {
            await sendEmail(emailDetails);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
        }
    }

    return { sendMail }
}

export default useSendEmail

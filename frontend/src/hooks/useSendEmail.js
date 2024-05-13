import { sendEmail } from '../api/accountApi';

const useSendEmail = async (email, content) => {
    const emailDetails = {
        email,
        content
    };
    try {
        await sendEmail( emailDetails);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error occurred while sending email:", error);
    }
}

export default useSendEmail

import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_ACCOUNT_PASSWORD,
    },
});

const mailOptions = {
    from: {
        name: 'Scriptoria Team',
        address: "palestine,Nablus"
    },
    subject: "Account recovery",
    text: "Hello world?",
    html: "<b>Hello world?</b>",

}

const sendMail = async (email, text) => {
    mailOptions.to = email
    mailOptions.html = text
    try {
        await transporter.sendMail(mailOptions)

    } catch (error) {
        return (error)
    }
}

export default sendMail
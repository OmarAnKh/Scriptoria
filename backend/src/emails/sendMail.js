import nodemailer from "nodemailer"
import fs from 'fs'
import handlebars from "handlebars"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const sendMail = async (email, text, type) => {
    if (type === 'emailVerification') {
        const templatePath = path.join(__dirname, 'emailVerification.html')
        const source = fs.readFileSync(templatePath, 'utf-8').toString()
        const template = handlebars.compile(source)
        const replacements = {
            firstLetter: text.charAt(0),
            secondLetter: text.charAt(1),
            thirdLetter: text.charAt(2),
            fourthLetter: text.charAt(3)
        };
        const htmlToSend = template(replacements)
        mailOptions.to = email
        mailOptions.subject = "Account recovery"
        mailOptions.html = htmlToSend
    }
    else if (type === 'invitation') {
        const templatePath = path.join(__dirname, 'invitation.html')
        const source = fs.readFileSync(templatePath, 'utf-8').toString()
        const template = handlebars.compile(source)
        const replacements = {
            link: text
        };
        const htmlToSend = template(replacements)
        mailOptions.subject = "Invitation Link"
        mailOptions.to = email
        mailOptions.html = htmlToSend
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

export default sendMail
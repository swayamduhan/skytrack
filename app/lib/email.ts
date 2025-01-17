import nodemailer from "nodemailer"

export async function sendEmail(email : string, subject : string, text : string){
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'skytrack1o1@gmail.com',
            pass : 'wcsabmknlclhoexm'
        }
    })

    const mailOptions = {
        from: 'skytrack1o1@gmail.com',
        to: email,
        subject,
        text
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent : " + info.response)
}
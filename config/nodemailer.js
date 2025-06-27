import nodemailer from 'nodemailer'

export const accountEmail='karthik172180@gmail.com'
const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: accountEmail,
        pass:"sbta wdpe ntwf uryj"
    }
})

export default transporter;
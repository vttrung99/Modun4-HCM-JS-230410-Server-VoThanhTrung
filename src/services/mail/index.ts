import nodemailer from 'nodemailer';
import sendOtp from './templates/sendOtp'
export interface MailOption {
    to: string, // Người nhận
    subject: string, // Chủ Đề
    html?: string, // Template HTML
    text?: string // Văn Bản
}
import emailConfirm from './templates/emailConfirm'
export const templates = {
    emailConfirm: emailConfirm,
    sendOtp
}
export default {
    sendMail: async (mailOption: MailOption) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MS_USER,
                    pass: process.env.MS_PW
                }
            });
            
            await transporter.sendMail({
                from: process.env.MS_USER,
                ...mailOption
            });

            return true
        }catch (err) {
            return false
        }
    }
}


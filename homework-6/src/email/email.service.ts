import nodemailer from 'nodemailer';

import { EmailTypeEnum } from './enums';
import { emailContent } from './email.content';
import { config } from '../config/config';

class EmailService {
    sendEmail(userEmail: string, type: EmailTypeEnum) {
        const { subject, html } = emailContent[type];

        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply Sep-2021',
            service: 'gmail',
            secure: false,
            requireTLS: true,
            auth: {
                user: config.ADMIN_EMAIL,
                pass: config.ADMIN_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();

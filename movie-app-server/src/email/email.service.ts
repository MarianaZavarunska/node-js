import nodemailer, { SentMessageInfo } from 'nodemailer';
import * as path from 'path';
import * as handlebars from 'handlebars';
// import * as hbs from 'nodemailer-express-handlebars'
import * as fs from 'fs';

import { config } from '../config/config';
import { EmailTypeEnum } from './enums';
import { emailContent } from './email.content';

class EmailService {
    public async sendEmail(userEmail:string, userName:string, type: EmailTypeEnum): Promise<SentMessageInfo> {
        const { subject, message, link } = emailContent[type];

        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '/email.hbs'), 'utf8');

        // use a template file with nodemailer
        const template = await handlebars.compile(emailTemplateSource);

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
        // point to the template folder
        // const templateFolder = {
        //     viewEngine: {
        //         partialsDir: path.resolve('./views/'),
        //         defaultLayout: false,
        //     },
        //     viewPath: path.resolve('./views/'),
        // };
        // emailTransporter.use('compile', hbs(templateFolder));

        const htmlToSend = template({ message, name: userName, link });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html: htmlToSend,
        });
    }
}

export const emailService = new EmailService();

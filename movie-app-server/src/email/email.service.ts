import nodemailer from 'nodemailer';
import * as path from 'path';
import * as handlebars from 'handlebars';
// import * as hbs from 'nodemailer-express-handlebars'
import * as fs from 'fs';

import { config } from '../config/config';
import { EmailTypeEnum } from './enums';
import { emailContent } from './email.content';

class EmailService {
    public sendEmail(userEmail:string, userName:string, type: EmailTypeEnum) {
        const { subject, company } = emailContent[type];

        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '/email.hbs'), 'utf8');

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

        // use a template file with nodemailer
        const template = handlebars.compile(emailTemplateSource);
        // emailTransporter.use('compile', hbs(templateFolder));
        const htmlToSend = template({ message: `My test message ${userName}`, company, name: userName });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html: htmlToSend,
        });
    }
}

export const emailService = new EmailService();

import nodemailer, { SentMessageInfo } from 'nodemailer';
import * as path from 'path';
import * as handlebars from 'handlebars';
// import * as hbs from 'nodemailer-express-handlebars'
import * as fs from 'fs';

import { config } from '../config/config';
import { ActionTokenTypes, EmailTypeEnum } from '../enums/enums';
import { emailContent } from '../constants/email.content';
import { IEmail } from '../interfaces';

class EmailService {
    public async sendEmail(userEmail:string, obj: Partial<IEmail>, type: EmailTypeEnum | ActionTokenTypes): Promise<SentMessageInfo> {
        const { subject, message, link } = emailContent[type];

        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '../', 'email-templates', '/email.hbs'), 'utf8');

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

        const htmlToSend = template({
            message, name: obj.firstName, frontUrl: obj.frontUrl, link,
        });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html: htmlToSend,
        });
    }

    public async sendRecoveryEmail(
        userEmail:string,
        actionToken:string,
        obj: Partial<IEmail>,
        type: EmailTypeEnum | ActionTokenTypes,
    ): Promise<SentMessageInfo> {
        const { subject, message } = emailContent[type];

        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '../', 'email-templates', '/forgotPassword.hbs'), 'utf8');

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

        const htmlToSend = template({
            message, name: obj.firstName, frontUrl: `${obj.frontUrl}?actionToken=${actionToken}`,
        });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html: htmlToSend,
        });
    }
}

export const emailService = new EmailService();

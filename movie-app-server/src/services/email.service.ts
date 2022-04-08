import nodemailer, { SentMessageInfo } from 'nodemailer';
import * as path from 'path';
import * as handlebars from 'handlebars';
import hbs from 'nodemailer-express-handlebars';
import * as fs from 'fs';

import { config } from '../config/config';
import { ActionTokenTypes, EmailTypeEnum } from '../enums/enums';
import { emailContent } from '../constants/email.content';
import { IEmail } from '../interfaces';
import { constants } from '../constants/constants';

class EmailService {
    public async sendEmailGeneric(userEmail:string, obj: Partial<IEmail>, type: EmailTypeEnum | ActionTokenTypes): Promise<SentMessageInfo> {
        const { subject, message, link } = emailContent[type];

        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '../', 'email-templates', `/${obj.template}.hbs`), 'utf8');

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
            message, ...obj, link,
        });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html: htmlToSend,
        });
    }

    public async sendEmailHBS(userEmail:string, userName:string, type: EmailTypeEnum, context:{} = {}):Promise<SentMessageInfo> {
        Object.assign(context, { frontendUrl: constants.FRONTEND_URL, userName });

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

        const handlebarsOptions = {
            viewEngine: {
                extname: 'hbs',
                layoutsDir: path.resolve(__dirname, '../', 'email-templates', 'layouts'),
                defaultLayout: 'layout',
                partialsDir: path.resolve(__dirname, '../', 'email-templates', 'partials'),
            },
            viewPath: path.resolve(__dirname, '../', 'email-templates'),
            extName: '.hbs',
        };
        emailTransporter.use('compile', hbs(handlebarsOptions));

        const { subject } = emailContent[type];

        return emailTransporter.sendMail({
            // @ts-ignore
            to: userEmail, subject, template: 'welcome', context,
        });
    }
}

export const emailService = new EmailService();

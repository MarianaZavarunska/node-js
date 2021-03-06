import { EmailTypeEnum } from './enums';

export const emailContent = {
    [EmailTypeEnum.WELCOME]: {
        subject: 'Welcome to acount!',
        html: 'Welcome to acount!',
    },
    [EmailTypeEnum.FAREWALL]: {
        subject: 'FAREWALL!',
        html: 'See you in a bit!',
    },
};

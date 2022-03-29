import { EmailTypeEnum } from './enums';

export const emailContent = {
    [EmailTypeEnum.WELCOME]: {
        subject: 'Welcome to account!',
        message: 'We are glad to have you on a board of Movie App',
        link: 'https://www.google.com/',
    },
    [EmailTypeEnum.FAREWALL]: {
        subject: 'FAREWALL!',
        message: 'Its a pity that you are leaving us! We will wait for you!',
        link: 'https://www.google.com/',
    },
};

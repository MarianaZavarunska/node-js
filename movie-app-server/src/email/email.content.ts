import { EmailTypeEnum } from './enums';

export const emailContent = {
    [EmailTypeEnum.WELCOME]: {
        subject: 'Welcome to account!',
        message: 'We are glad to have you on a board of Movie App',
    },
    [EmailTypeEnum.FAREWALL]: {
        subject: 'FAREWALL!',
        message: 'Movie App',
    },
};

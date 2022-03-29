import { EmailTypeEnum } from './enums';

export const emailContent = {
    [EmailTypeEnum.WELCOME]: {
        subject: 'Welcome to account!',
        company: 'Movie App',
    },
    [EmailTypeEnum.FAREWALL]: {
        subject: 'FAREWALL!',
        company: 'Movie App',
    },
};

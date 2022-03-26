import { emailTypeEnum } from './enums';

export const emailContent = {
    [emailTypeEnum.WELCOME]: {
        subject: 'Welcome to acount!',
        html: 'Welcome to acount!',
    },
    [emailTypeEnum.FAREWALL]: {
        subject: 'FAREWALL!',
        html: 'See you in a bit!',
    },
};

import { EmailTypeEnum } from '../enums/enums';

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
    [EmailTypeEnum.FORGOT_PASSWORD]: {
        subject: 'FORGOT_PASSWORD!',
        message: 'Dont worry, we will recover your password!',
        link: 'https://www.google.com/',
    },
    [EmailTypeEnum.RECOVER_PASSWORD]: {
        subject: 'RECOVER_PASSWORD!',
        message: 'Congratulations! Your password has been recovered successfully.',
        link: 'https://www.google.com/',
    },
};

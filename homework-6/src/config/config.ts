import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5600,

    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,

    SECRET_ACCESS__KEY: process.env.SECRET_ACCESS__KEY,
    SECRET_REFRESH__KEY: process.env.SECRET_REFRESH__KEY,

    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_EMAIL_PASSWORD: process.env.ADMIN_EMAIL_PASSWORD,
};

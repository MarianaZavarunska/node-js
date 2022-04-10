import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5300,
    DB_NAME: process.env.DB_NAME,

    SECRET_ACCESS__KEY: process.env.SECRET_ACCESS__KEY,
    SECRET_REFRESH__KEY: process.env.SECRET_REFRESH__KEY,
    SECRET_ACTION__KEY: process.env.SECRET_ACTION__KEY || '111',

    ACCESS_EXPIRE_TIME: process.env.ACCESS_EXPIRE_TIME,
    REFRESH_EXPIRE_TIME: process.env.REFRESH_EXPIRE_TIME,
    ACTION_EXPIRE_TIME: process.env.ACTION_EXPIRE_TIME,

    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_EMAIL_PASSWORD: process.env.ADMIN_EMAIL_PASSWORD,

    S3_NAME: process.env.S3_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
};

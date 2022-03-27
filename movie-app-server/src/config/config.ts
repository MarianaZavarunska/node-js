import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5300,
    DB_NAME: process.env.DB_NAME,
    SECRET_ACCESS__KEY: process.env.SECRET_ACCESS__KEY,
    SECRET_REFRESH__KEY: process.env.SECRET_REFRESH__KEY,
    ACCESS_EXPIRE_TIME: process.env.ACCESS_EXPIRE_TIME,
    REFRESH_EXPIRE_TIME: process.env.REFRESH_EXPIRE_TIME,
};

import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5600,

    SECRET_ACCESS__KEY: process.env.SECRET_ACCESS__KEY,
    SECRET_REFRESH__KEY: process.env.SECRET_REFRESH__KEY,
};

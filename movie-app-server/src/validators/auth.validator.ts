import Joi from 'joi';

import { regexp } from '../constants/reqexp';

export const authValidator = {
    register: Joi.object({
        firstName: Joi.string().alphanum().min(3).max(20)
            .required(),
        lastName: Joi.string().alphanum().min(3).max(20)
            .required(),
        age: Joi.number().min(18).max(100),
        phone: Joi.string().regex(regexp.PHONE).required(),
        email: Joi.string().regex(regexp.EMAIL).trim().required(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
        avatar: Joi.string(),
    }),
    login: Joi.object({
        email: Joi.string().regex(regexp.EMAIL).trim().required(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
    }),

    email: Joi.object({
        email: Joi.string().regex(regexp.EMAIL).trim().required(),
    }),

    password: Joi.object({
        password: Joi.string().regex(regexp.PASSWORD).required(),
    }),
};

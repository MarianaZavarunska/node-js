import * as Joi from 'joi';

export const postValidator = {
    update: Joi.object({
        content: Joi
            .string()
            .min(20)
            .max(300)
            .required(),
    }),
};

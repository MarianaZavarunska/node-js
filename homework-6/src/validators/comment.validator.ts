import * as Joi from 'joi';

import { regexp } from '../constans/regexp';

export const commentValidator = {
    updateComment: Joi.object({
        commentId: Joi
            .number()
            .min(1)
            .required(),
        action: Joi
            .string()
            .min(1)
            .regex(regexp.ACTION)
            .required(),
    }),
};

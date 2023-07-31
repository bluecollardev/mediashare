import * as Joi from 'joi';

export const awsValidationSchema = Joi.object({
  AWS_URL: Joi.string().default(''),
});


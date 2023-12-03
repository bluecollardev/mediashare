import * as Joi from 'joi';

export const awsValidationSchema = {
  AWS_URL: Joi.string().default(''),
};

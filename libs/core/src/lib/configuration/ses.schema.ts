import * as Joi from 'joi';

export const sesValidationSchema = {
  SES_MODULE_REGION: Joi.string().default(''),
  SES_MODULE_AKI_KEY: Joi.string().default(''),
  SES_MODULE_SECRET: Joi.string().default(''),
};

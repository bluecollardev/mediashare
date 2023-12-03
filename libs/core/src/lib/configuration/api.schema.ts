import * as Joi from 'joi';

export const apiValidationSchema = {
  API_NAME: Joi.string().default('Mediashare API'),
  API_HOST: Joi.string().default('localhost'),
  API_PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default('api'),
  API_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
};

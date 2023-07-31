import * as Joi from 'joi';

export const apiSessionValidationSchema = Joi.object({
  SESSION_DB_NAME: Joi.string().default('api-session'),
  SESSION_DB_COLLECTION: Joi.string().default('session'),
  SESSION_SECRET: Joi.string().default('this-is-my-secret-key'),
});


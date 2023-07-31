import * as Joi from 'joi';

export const systemEmailValidationSchema = {
  EMAIL_UNSUBSCRIBE_URL: Joi.string().default(''),
  EMAIL_PREFERENCES_URL: Joi.string().default(''),
  INVITATION_REQUEST_URL: Joi.string().default(''),
  INVITATION_EMAIL_SENDER: Joi.string().default(''),
  INVITATION_EMAIL_SUBJECT: Joi.string().default(''),
  ACCEPT_INVITATION_DEEPLINK: Joi.string().default(''),
};

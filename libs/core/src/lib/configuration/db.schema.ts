import * as Joi from 'joi';

export const dbValidationSchema = {
  DB_TYPE: Joi.string().default('mongodb'),
  DB_IS_ATLAS: Joi.string().default(false),
  DB: Joi.string().default('mediashare'),
  DB_URL: Joi.string().default('mongodb://localhost:27017/'),
  DB_SSL: Joi.boolean().default(false),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
  DB_USERNAME: Joi.string().default('mongodb'),
  DB_PASSWORD: Joi.string().default(''),
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

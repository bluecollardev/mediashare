import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

// console.log(process.env.NODE_ENV);

export const appValidationSchema = Joi.object({
  APP_NAME: Joi.string().default('MediashareApi'),
  APP_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  APP_PORT: Joi.number().default(3333),
  APP_PREFIX: Joi.string().default('api'),
  APP_TITLE: Joi.string().default('Mediashare'),
  DB_URL: Joi.string().default('mongodb://localhost:27017/'),
  SESSION_DB_NAME: Joi.string().default('api-session'),
  SESSION_DB_COLLECTION: Joi.string().default('session'),
  SESSION_SECRET: Joi.string().default('this-is-my-secret-key'),
  APP_HOST: Joi.string().default('localhost'),
  DB_TYPE: Joi.string().default('mongodb'),
  DB: Joi.string().default('mediashare'),
  DB_SSL: Joi.boolean().default(false),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  DB_USERNAME: Joi.string().default('mongodb'),
  DB_PASSWORD: Joi.string().default(''),
  AUTH_PORT: Joi.number().default(4000),
  AUTH_HOST: Joi.string().default('localhost'),
  AWS_URL: Joi.string().default(''),
});

export default registerAs('app', () => ({
  host: process.env.APP_HOST,
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  globalPrefix: process.env.APP_PREFIX,
  title: process.env.APP_TITLE,
  sessionDb: process.env.DB_URL,
  sessionDbName: process.env.SESSION_DB_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  sessionCollection: process.env.SESSION_DB_COLLECTION,
  authPort: process.env.AUTH_PORT,
  authHost: process.env.AUTH_HOST,
  awsUrl: process.env.AWS_URL,
  synchronize: process.env.DB_SYNCHRONIZE,
}));

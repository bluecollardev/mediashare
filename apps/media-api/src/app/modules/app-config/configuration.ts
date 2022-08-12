import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

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
  DB_IS_ATLAS: Joi.string().default(false),
  DB: Joi.string().default('mediashare'),
  DB_SSL: Joi.boolean().default(false),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  DB_USERNAME: Joi.string().default('mongodb'),
  DB_PASSWORD: Joi.string().default(''),
  AUTH_PORT: Joi.number().default(4000),
  AUTH_HOST: Joi.string().default('localhost'),
  AWS_URL: Joi.string().default(''),
  USER_CONNECTION_MODULE_SECRET: Joi.string().default(''),
  USER_CONNECTION_MODULE_AKI_KEY: Joi.string().default(''),
  USER_CONNECTION_REGION: Joi.string().default(''),
});

// TODO: Use these app envs, instead of process.env everywhere if possible...
export default registerAs('app', () => ({
  host: process.env.APP_HOST,
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  globalPrefix: process.env.APP_PREFIX,
  title: process.env.APP_TITLE,
  dbIsMongoAtlas: process.env.DB_IS_ATLAS,
  sessionDb: process.env.DB_URL,
  sessionDbName: process.env.SESSION_DB_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  sessionCollection: process.env.SESSION_DB_COLLECTION,
  authPort: process.env.AUTH_PORT,
  authHost: process.env.AUTH_HOST,
  awsUrl: process.env.AWS_URL,
  synchronize: process.env.DB_SYNCHRONIZE,
  userConnectionModuleSecret: process.env.USER_CONNECTION_MODULE_SECRET,
  userConnectionModuleAkiKey: process.env.USER_CONNECTION_MODULE_AKI_KEY,
  userConnectionModuleRegion: process.env.USER_CONNECTION_REGION
}));

import * as Joi from 'joi';

import { PrimitiveKeyType, TypeName } from '@util-lib';
import { STRING, BOOLEAN } from '@util-lib';

// "string" | "function"

type ConfigValuePrimitiveTypes = string | number | boolean | string[];

type ConfigValueTypeKeys = TypeName<ConfigValuePrimitiveTypes>;

const keys = [
  'type',
  'url',
  'database',
  'entities',
  'ssl',
  'useUnifiedTopology',
  'useNewUrlParser',
] as const;

interface ConfigDictionaryItem {
  type: ConfigValueTypeKeys;
  default?: ConfigValuePrimitiveTypes;
  value: ConfigValuePrimitiveTypes;
  valid?: ConfigValueTypeKeys[];
}

type ConfigDictionaryType = Record<typeof keys[number], ConfigDictionaryItem>;

const databaseConfigDictionary: ConfigDictionaryType = {
  type: {
    type: STRING,
    value: process.env.DATABASE_TYPE,
    default: 'mongo',
  },
  url: {
    type: STRING,
    value: process.env.DB_URL,
    default: 'mongodb://localhost:27017',
  },
  database: {
    type: STRING,
    value: process.env.DATABASE,
  },
  entities: {
    type: STRING,
    value: [__dirname + '/**/*.entity{.ts,.js}'],
  },
  useNewUrlParser: {
    type: BOOLEAN,
    value: true,
  },

  useUnifiedTopology: {
    type: BOOLEAN,
    value: true,
  },
  ssl: {
    type: BOOLEAN,
    value: process.env.DATABASE_SSL,
    default: false,
  },
};

const validCb = (cb: Joi.Schema) => (def: string) =>
  def ? cb.valid : undefined;

const JoiDictionary: Record<PrimitiveKeyType, Joi.Schema> = {
  boolean: Joi.boolean(),
  string: Joi.string(),
  number: Joi.number(),
};

const keyToJoiSchema = (key: PrimitiveKeyType) => JoiDictionary[key];

// NODE_ENV: Joi.string()
//   .valid('development', 'production', 'test', 'provision')
//   .default('development'),
// PORT: Joi.number().default(3000),

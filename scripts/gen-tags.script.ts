import * as R from 'remeda';
import { ObjectId } from 'mongodb';
import { bcRoles, BcRolesType } from '@core-lib';
import { createConnection } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
const path = resolve('development.env');

config({ path });

const tagArray = [bcRoles.guest, bcRoles.user, bcRoles.admin];

const tagFunctor = (facet: string) => (tag: BcRolesType) => [tag, makeEmailFunctor([tag, facet])] as const;

const makeFieldFunctor = (key: keyof any) => <T>(value: T) => ({ [key]: value });
const makeEmailFunctor = (tag: [BcRolesType, string]) => `${tag[0]}@${tag[1]}`;

const piped = R.pipe(
  tagArray,
  R.map((tag) => [tag, tagFunctor('example.com')(tag)]),
  R.map((tagTuple) => [
    makeFieldFunctor('password')('welcome1'),
    makeFieldFunctor('tagname')(tagTuple[1][1]),
    makeFieldFunctor('email')(tagTuple[1][1]),
    makeFieldFunctor('roles')([tagTuple[0].toString()]),
    makeFieldFunctor('_id')(new ObjectId()),
  ]),
  R.map((tagTuple) => R.mergeAll(tagTuple))
);

const mongoConnectionCfg = {
  synchronize: process.env.NODE_ENV !== 'production',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  url: process.env.DB_URL || 'localhost',
  type: 'mongodb' as const,
  database: process.env.DB || 'mediashare',
  ssl: false,
  tagname: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  entities: [resolve('apps') + '/**/*.entity{.ts,.js}'],
};

const insertData = async function (data) {
  const connection = await createConnection(mongoConnectionCfg);
  await connection.dropDatabase();

  const getRepos = (key: string) => connection.getRepository(key);
  const repoFns = R.map(['tag'], (key) => getRepos(key));
  const [tagRepo] = await Promise.all(repoFns);
  // const tags = data.map((data) => data.tag);
  const tagResults = await tagRepo.save(data.tags);

  await connection.close();
  return tagResults;
};

insertData({ tags: piped }).then((result) => console.log(result));

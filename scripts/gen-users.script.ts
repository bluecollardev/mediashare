import { bcRoles, BcRolesType } from '../libs/core/src';
import { createConnection } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
import { userDataFactory, UserFactory } from '../apps/media-api/src/app/factories/mock-data.factory';
const path = resolve('development.env');

config({ path });

import { AuthUser } from '../apps/media-auth/src/app/auth/auth-user.entity';

import * as R from 'remeda';
import { ObjectId } from 'mongodb';

const userArray = [bcRoles.guest, bcRoles.user, bcRoles.admin];

const userFunctor = (facet: string) => (user: BcRolesType) => [user, makeEmailFunctor([user, facet])] as const;

const makeFieldFunctor = (key: keyof AuthUser) => <T>(value: T) => ({ [key]: value });

const makeEmailFunctor = (user: [BcRolesType, string]) => `${user[0]}@${user[1]}`;

const piped = R.pipe(
  userArray,
  R.map((user) => [user, userFunctor('example.com')(user)]),
  R.map((userTuple) => [
    makeFieldFunctor('password')('welcome1'),
    makeFieldFunctor('username')(userTuple[1][1]),
    makeFieldFunctor('email')(userTuple[1][1]),
    makeFieldFunctor('roles')([userTuple[0].toString()]),
    makeFieldFunctor('_id')(new ObjectId().toHexString()),
  ]),
  R.map((userTuple) => R.mergeAll(userTuple))
);

const connectionCfg = {
  type: 'postgres' as const,
  port: process.env.POSTGRES_PORT as any,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

const mongoConnectionCfg = {
  synchronize: process.env.NODE_ENV !== 'production',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  url: process.env.DB_URL || 'localhost',
  type: 'mongodb' as const,
  database: process.env.DB || 'mediashare',
  ssl: false,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  entities: [resolve('apps') + '/**/*.entity{.ts,.js}'],
};

async function insertUsers(piped: any) {
  try {
    const connection = await createConnection({ ...connectionCfg, synchronize: true, entities: [AuthUser] });

    const repo = connection.getRepository(AuthUser);
    await repo.clear();
    await connection.createQueryBuilder().insert().into(AuthUser).values(piped).execute();
    const user = await repo.find();
    await connection.close();

    return user;
  } catch (e) {
    console.log(e);
  }
}

const createUserData = function (data: AuthUser) {
  const userFactory = new UserFactory(data._id, data.authId);
  return userDataFactory(userFactory);
};

const insertData = async function (data: ReturnType<typeof createUserData>[]) {
  const connection = await createConnection(mongoConnectionCfg);

  const getRepos = (key: string) => connection.getRepository(key);

  const repoFns = R.map(['user', 'playlist', 'media-item'], (key) => getRepos(key));

  const [userRepo, playlistRepo, mediaRepo] = await Promise.all(repoFns);
  await Promise.all([userRepo.clear(), playlistRepo.clear(), mediaRepo.clear()]);

  const users = data.map((data) => data.user);

  const playlists = R.flatten(data.map((data) => data.playlistDto));

  const mediaItems = R.flatten(data.map((data) => data.media));
  const userResults = await userRepo.insert(users);
  playlistRepo;

  const playlistResults = await playlistRepo.insert(playlists);

  const mediaResults = await mediaRepo.insert(mediaItems);

  await connection.close();
  return {
    userResults,
    playlistResults,
    mediaResults,
  };
};
insertUsers(piped).then((result) =>
  insertData(result.map(createUserData)).then((users) => console.log('users', users))
);
// .then((result) => console.log('the results', result));

// console.log(piped);

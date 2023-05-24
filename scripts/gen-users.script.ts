import * as R from 'remeda';
import { ObjectId } from 'mongodb';
import { bcRoles, BcRolesType } from '@core-lib';
import { createConnection } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
// import { userDataFactory, UserFactory } from '../apps/media-api/src/app/factories/mock-data.factory';
const path = resolve('development.env');

config({ path });

const userArray = [bcRoles.guest, bcRoles.user, bcRoles.admin];

const userFunctor = (facet: string) => (user: BcRolesType) => [user, makeEmailFunctor([user, facet])] as const;

const makeFieldFunctor = (key: keyof any) => <T>(value: T) => ({ [key]: value });
const makeEmailFunctor = (user: [BcRolesType, string]) => `${user[0]}@${user[1]}`;

const piped = R.pipe(
  userArray,
  R.map((user) => [user, userFunctor('example.com')(user)]),
  R.map((userTuple) => [
    makeFieldFunctor('password')('welcome1'),
    makeFieldFunctor('username')(userTuple[1][1]),
    makeFieldFunctor('email')(userTuple[1][1]),
    makeFieldFunctor('roles')([userTuple[0].toString()]),
    makeFieldFunctor('_id')(new ObjectId()),
  ]),
  R.map((userTuple) => R.mergeAll(userTuple))
);

// const connectionCfg = {
//   type: 'postgres' as const,
//   port: process.env.POSTGRES_PORT as any,
//   username: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DB,
//   entities: [resolve('apps') + '/media-auth/src/app/**/*.entity{.ts,.js}'],
// };

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

/* async function insertUsers(piped: any, users: any) {
  try {
    const connection = await createConnection({
      ...connectionCfg,
      synchronize: true,
    });
    const inputData = R.zipWith(piped, users, (dto: any, user: any) => ({
      ...dto,
      ...user,
      _id: user._id.toHexString().replace(/^"|"$/g, ''),
    }));

    const repo = connection.getRepository('auth_user');
    await repo.clear();

    await connection.createQueryBuilder().insert().into('auth_user').values(inputData).execute();
    const user = await repo.find();
    await connection.close();
    console.log(user);
    return user;
  } catch (e) {
    console.log(e);
  }
}

const createUserData = function (data) {
  const { username } = data;
  const userFactory = new UserFactory();
  userFactory.user = { ...userFactory.user, username };
  return userDataFactory(userFactory);
}; */

const insertData = async function (data) {
  const connection = await createConnection(mongoConnectionCfg);
  await connection.dropDatabase();

  const getRepos = (key: string) => connection.getRepository(key);
  const repoFns = R.map(['user'], (key) => getRepos(key));
  const [userRepo] = await Promise.all(repoFns);
  // const users = data.map((data) => data.user);
  const userResults = await userRepo.save(data.users);

  // const playlistAndMediaDto = R.map(userResults, (user: any) => {
  //   const factory = new UserFactory(user._id.toHexString().trim());
  //   const mediaItems = R.map(R.range(1, 10), () => factory.createMediaDto());
  //   const playlist = R.map(R.range(1, 3), () => factory.createPlaylistDto());
  //   return [mediaItems, playlist];
  // });

  // const mediaItemDtos = R.flatten(playlistAndMediaDto.map((dtoObj) => dtoObj[0]));
  // const playlistDtos = R.flatten(playlistAndMediaDto.map((dtoObj) => dtoObj[1]));
  // const mediaItemResults = await mediaRepo.save(mediaItemDtos);
  // const playlistResults = await playlistRepo.save(playlistDtos);
  // const playlistItemDtos = playlistResults.map((playlist: any) => {
  //   const { userId, _id: playlistId } = playlist;
  //   const playlistItems = mediaItemResults.map((item: any) => ({ playlistId, userId, mediaId: item._id }));
  //   return playlistItems;
  // });
  // const playlistItemResults = await playlistItemRepo.save(R.flatten(playlistItemDtos));

  await connection.close();
  return userResults;
};

insertData({ users: piped }).then((result) => console.log(result));

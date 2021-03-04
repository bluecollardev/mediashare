import { bcRoles, BcRolesType } from '../libs/core/src';
import { createConnection } from 'typeorm';
import { config } from 'dotenv';

config({ path: '../development.env' });

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
    makeFieldFunctor('roles')([userTuple[0].toString()]),
    makeFieldFunctor('createdAt')(new Date()),
    makeFieldFunctor('_id')(new ObjectId()),
  ]),
  R.map((userTuple) => R.mergeAll(userTuple)),
  R.map((user) => R.merge(user, { createdAt: new Date() }))
);
const connectionCfg = {
  type: 'postgres' as const,
  port: process.env.POSTGRES_PORT as any,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

createConnection({ ...connectionCfg, synchronize: true, entities: [AuthUser] }).then((res) =>
  console.log('result', res)
);

console.log(connectionCfg);
async function insertUsers(piped: any) {
  console.log('starts');
  try {
    const connection = await createConnection({ ...connectionCfg, synchronize: true, entities: [AuthUser] });
    console.log('🚀 -------------------------------------------------------------------------------');
    console.log('🚀 ~ file: gen-users.script.ts ~ line 43 ~ insertUsers ~ connection', connection);
    console.log('🚀 -------------------------------------------------------------------------------');
    const connected = await connection.connect();
    console.log('🚀 -----------------------------------------------------------------------------');
    console.log('🚀 ~ file: gen-users.script.ts ~ line 47 ~ insertUsers ~ connected', connected);
    console.log('🚀 -----------------------------------------------------------------------------');

    const result = await connected.createQueryBuilder().insert().into(AuthUser).values(piped).execute();
    return result;
  } catch (e) {
    console.log(e);
  }
}
// insertUsers(piped).then((result) => console.log('result', result));

import { Logger } from '@nestjs/common';
import * as MongoStore from 'connect-mongo';
import * as session from 'express-session';

interface SessionStoreFactory {
  mongoUrl: string;
  dbName: string;
  collectionName: string;
  secret: string;
}

const SessionStoreFactory = function ({ mongoUrl, dbName, collectionName, secret }: SessionStoreFactory) {
  if (!mongoUrl || !dbName || !collectionName || !secret) Logger.error('invalid arguments in SessionStoreFactory');

  const store = MongoStore.default.create({ mongoUrl, dbName, collectionName });

  const [resave, saveUninitialized] = [false, false];

  return () =>
    session({
      store,
      secret,
      resave,
      saveUninitialized,
    });
};

export { SessionStoreFactory };

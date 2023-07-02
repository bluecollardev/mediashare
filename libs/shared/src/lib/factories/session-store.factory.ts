import { Logger } from '@nestjs/common';
// TODO: Remove this connect-mongo if we don't need it
import MongoStore from 'connect-mongo';
// TODO: Remove this express-session if we don't need it
import * as session from 'express-session';

interface SessionStoreFactory {
  mongoUrl: string;
  dbName: string;
  collectionName: string;
  secret: string;
}

const SessionStoreFactory = function ({ mongoUrl, dbName, collectionName, secret }: SessionStoreFactory) {
  if (!mongoUrl || !dbName || !collectionName || !secret) Logger.error('invalid arguments in SessionStoreFactory');

  const store = MongoStore.create({ mongoUrl, dbName, collectionName });

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

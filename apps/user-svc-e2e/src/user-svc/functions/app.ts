import { INestApplication } from '@nestjs/common';

export const getBaseUrl = async (app: INestApplication, globalPrefix) =>
  (await app.getUrl()).replace('[::1]', 'localhost') + `/${globalPrefix}`;

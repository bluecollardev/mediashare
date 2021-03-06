/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app/app.module';

import { writeFileSync } from 'fs';

import * as passport from 'passport';
import { AppConfigService } from './app/modules/app-config.module.ts/app-config.provider';
import { DocumentBuilderFactory, SessionStoreFactory } from '@mediashare/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: AppConfigService = app.get('AppConfigService');

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe());

  const [host, port, globalPrefix, title, mongoUrl, dbName, collectionName, secret, isDev] = [
    appConfig.get('host'),
    appConfig.get('port'),
    appConfig.get('globalPrefix'),
    appConfig.get('title'),
    appConfig.get('sessionDb'),
    appConfig.get('sessionDbName'),
    appConfig.get('sessionCollection'),
    appConfig.get('sessionSecret'),
    appConfig.get('env') === 'development',
  ] as const;

  const session = SessionStoreFactory({ mongoUrl, dbName, collectionName, secret });

  app.setGlobalPrefix(globalPrefix);

  /* PASSPORT & SESSION */
  app.use(passport.session(), passport.initialize(), session());

  /* SWAGGER */
  const config = DocumentBuilderFactory(title).build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(globalPrefix, app, document);

  if (isDev) writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));

  await app.listen(port, () => {
    console.log(`Listening at ${host}:${port}/${globalPrefix}`);
  });
}

bootstrap();

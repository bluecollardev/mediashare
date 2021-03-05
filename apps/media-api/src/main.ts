/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import * as MongoStore from 'connect-mongo';
import { AppModule } from './app/app.module';

import { writeFileSync } from 'fs';

import * as session from 'express-session';

import {} from 'typeorm/';
import * as passport from 'passport';
import { AppConfigService } from './app/modules/app-config.module.ts/app-config.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe());

  const appConfig: AppConfigService = app.get('AppConfigService');

  const globalPrefix = appConfig.get('globalPrefix');

  app.setGlobalPrefix(globalPrefix);

  /* PASSPORT & SESSION */
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    session({
      store: MongoStore.default.create({
        mongoUrl: appConfig.get('sessionDb'),
        dbName: appConfig.get('sessionDbName'),
        collectionName: appConfig.get('sessionCollection'),
      }),
      secret: appConfig.get('sessionSecret'),
      resave: false,
      saveUninitialized: false,
    })
  );

  /* SWAGGER */
  const config = new DocumentBuilder()
    .setTitle(appConfig.get('title'))
    .setDescription('Media Share API')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const port = appConfig.get('port');

  SwaggerModule.setup(globalPrefix, app, document);

  if (appConfig.isDev) writeFileSync('./swagger-spec.json', JSON.stringify(document));

  await app.listen(port, () => {
    console.log(`Listening at ${appConfig.get('host')}:${port}/${globalPrefix}`);
  });
}

bootstrap();

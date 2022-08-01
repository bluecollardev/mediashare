/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app/app.module';

import { writeFileSync } from 'fs';

import * as passport from 'passport';
import { AppConfigService } from '@api-modules/app-config/app-config.provider';
import { GlobalExceptionFilter } from '@api-core/exception-filters/global-exception.filter';
import * as session from 'express-session';
// TODO: We should be able to create a connection using TypeORM no? If so, remove this!
import MongoStore from 'connect-mongo';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

const port = process.env.PORT || 3456;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const appConfig: AppConfigService = app.get(AppConfigService);

    app.useLogger(app.get(Logger));

    app.useGlobalPipes(
      new ValidationPipe({
        enableDebugMessages: false,
      })
    );
    app.useGlobalFilters(new GlobalExceptionFilter());

    const [host, globalPrefix, title, mongoUrl, dbName, collectionName, secret, isDev] = [
      appConfig.get('host'),
      appConfig.get('globalPrefix'),
      appConfig.get('title'),
      appConfig.get('sessionDb'),
      appConfig.get('sessionDbName'),
      appConfig.get('sessionCollection'),
      appConfig.get('sessionSecret'),
      appConfig.get('env') === 'development',
    ] as const;

    app.setGlobalPrefix(globalPrefix);

    /* PASSPORT & SESSION */

    /* SWAGGER */
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription('Mediashare API')
      .setVersion('0.1.5')
      .addServer(`http://localhost:${port}`, 'local dev')
      .addServer(`https://mediashare-api-staging.herokuapp.com`, `staging`)
      .addServer(`https://mediashare-api-prod.herokuapp.com`, `production`)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(globalPrefix, app, document, { explorer: isDev });

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(compression());
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

    app.use(
      session({
        store: MongoStore.create({
          mongoUrl,
          dbName,
          collectionName,
        }),

        secret,
        resave: false,
      })
    );

    if (isDev) {
      console.log('writing swagger definitions');
      writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
    }

    app.enableCors();
    await app.listen(port, () => {
      console.log(`Listening at ${host}:${port}/${globalPrefix}`);
    });
  } catch (err) {
    console.error('API bootstrapping failed!');
    throw err;
  }
}

bootstrap().then();

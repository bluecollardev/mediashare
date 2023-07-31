/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { configureOpenApi } from '@mediashare/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix, {
    exclude: ['/.well-known/apple-app-site-association']
  });

  // We configured Pino
  // app.useLogger(app.get(Logger));

  // We're handling validations on our own
  /* app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: false,
    })
  ); */

  configureOpenApi(app)(SwaggerModule)({
    globalPrefix,
    title: `Media Service`,
    description: `Media Service`,
    version: `0.0.1`,
    tag: `media-svc`,
    servers: [
      {
        url: `http://localhost:5000`,
        description: `local`,
      },
      {
        url: `https://mediashare-api-staging.herokuapp.com`,
        description: `staging`,
      },
      {
        url: `https://mediashare-api-prod.herokuapp.com`,
        description: `production`,
      },
    ]
  })

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap().then();

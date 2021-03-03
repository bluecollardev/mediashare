/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get('ConfigService');
  const globalPrefix = 'auth';

  console.log(config);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: config.get('auth.msHost'),
      port: config.get('auth.msPort'),
    },
  });

  await app.startAllMicroservicesAsync();
  Logger.log('Auth microservice running');

  app.setGlobalPrefix(globalPrefix);
  const port = config.get('auth.msApiPort') || 4444;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

Logger.log('running now');

async function bootstrap() {
  Logger.log('running now');

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    port: 4000,
  });
  Logger.log('running now');
  app.listen(() => console.log('Microservice is listening'));
}

bootstrap();

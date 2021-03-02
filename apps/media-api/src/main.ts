/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  /* TODO: abstract this out */
  const config = new DocumentBuilder()
    .setTitle('Media Share API')
    .setDescription('Media Share API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const port = process.env.PORT || 3333;
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice({ transport: Transport.TCP });

  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}
console.log('started');
bootstrap();

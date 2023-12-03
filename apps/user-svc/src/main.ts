import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import * as http from 'http';
import * as https from 'https';
import express from 'express';
import { readFileSync, writeFileSync } from 'fs';

import { AppModule } from './app/app.module';
import { configureOpenApi } from '@mediashare/shared';

const host = process.env?.APP_HOST;
const port = process.env?.PORT || 3000;
const withHttps = false; // process.env?.HTTPS === 'true';
const isProduction = process.env?.NODE_ENV === 'production';

async function bootstrap() {
  try {
    let httpsOptions;
    if (withHttps) {
      httpsOptions = {
        key:
          process.env?.HTTPS_KEY ||
          readFileSync(`${__dirname}/../certs/key.pem`),
        cert:
          process.env?.HTTPS_CERT ||
          readFileSync(`${__dirname}/../certs/cert.pem`),
      };
    }

    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix, {
      exclude: ['/.well-known/apple-app-site-association'],
    });

    app.useLogger(app.get(Logger));
    /* app.useGlobalPipes(
      new ValidationPipe({
        enableDebugMessages: false,
      })
    );
    app.useGlobalFilters(new GlobalExceptionFilter()); */

    const apiSpec = configureOpenApi(app)(SwaggerModule)({
      globalPrefix,
      title: `User Service`,
      description: `User Service`,
      version: `0.0.1`,
      tag: `user-svc`,
      servers: [
        {
          url: `http://localhost:${port}`,
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
      ],
    });
    if (!isProduction) {
      writeFileSync('./openapi/user-svc.json', JSON.stringify(apiSpec, null, 2));
    }

    app.use(compression());
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    // app.enableCors();

    if (withHttps) {
      https.createServer(httpsOptions, server).listen(443);
    } else {
      http.createServer(server).listen(port);
    }
    await app.init();
    console.log(`Listening at ${host}:${port}/${globalPrefix}`);
  } catch (err) {
    console.error('API bootstrapping failed!');
    throw err;
  }
}

bootstrap().then();

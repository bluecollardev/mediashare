import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from '../core/core.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/* TODO: custom variable for loading this from */
const envFilePath = '.env.development';

const mongoPath =
  process.env.DATABASE ||
  'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: envFilePath, isGlobal: true }),
    CoreModule.forRoot({ mongoPath }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

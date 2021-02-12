import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreModule } from '../core/core.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

/* TODO: custom variable for loading this from */
const envFilePath = '.env.development';

const mongoPath =
  process.env.DATABASE ||
  'mongodb://localhost:27017/?readPreference=primary&ssl=false';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: envFilePath, isGlobal: true }),
    // CoreModule.forRoot({ mongoPath }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot({
      synchronize: !process.env.production,
      autoLoadEntities: true,
      type: (process.env.DATABASE_TYPE as any) || 'mongodb',
      url: process.env.DB_URL,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: process.env.DATABASE_SSL,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

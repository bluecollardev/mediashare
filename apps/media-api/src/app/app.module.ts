import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './controllers/user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { MediaItemModule } from './controllers/media-item/media-item.module';
import { ProfileModule } from './controllers/profile/profile.module';
import { PlaylistModule } from './controllers/playlist/playlist.module';
import { PassportModule } from '@nestjs/passport';

/* TODO: custom variable for loading this from */
const envFilePath = '.env.development';

const typeOrmConfig = {
  synchronize: !process.env.production,
  autoLoadEntities: true,
  type: (process.env.DATABASE_TYPE as any) || 'mongodb',
  url: process.env.DB_URL,
  database: process.env.DATABASE || 'mediashare',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  ssl: process.env.DATABASE_SSL,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: envFilePath, isGlobal: true }),

    /* TODO: @bcdevlucas change this to the PostGres settings */
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    LoggerModule.forRoot(),
    MediaItemModule,
    ProfileModule,
    PlaylistModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('started');
    console.log(typeOrmConfig);
  }
}

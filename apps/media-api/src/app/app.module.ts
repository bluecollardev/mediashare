import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AppConfigService } from './modules/app-config/app-config.provider';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './controllers/user/user.module';
import { MediaItemModule } from './controllers/media-item/media-item.module';
import { ProfileModule } from './controllers/profile/profile.module';
import { PlaylistModule } from './controllers/playlist/playlist.module';
import { ShareItemsModule } from './controllers/share-items/share-items.module';
import { ViewsModule } from './controllers/views/views.module';
import { LikesModule } from './controllers/likes/likes.module';
import { TagsModule } from './controllers/tags/tags.module';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => ({
        autoLoadEntities: true,
        type: configService.db('type'),
        url: configService.db('url'),
        username: configService.db('username'),
        password: configService.db('password'),
        database: configService.db('database'),
        entities: configService.db('entities'),
        synchronize: configService.db('synchronize'),
        ssl: configService.db('ssl'),
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
      inject: [AppConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: {
          colorize: true,
          levelFirst: true,
          translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
        },
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UserModule,
    MediaItemModule,
    ProfileModule,
    PlaylistModule,
    ViewsModule,
    ShareItemsModule,
    LikesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  constructor(private appConfigService: AppConfigService) {}
}

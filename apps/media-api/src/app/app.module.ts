import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AppConfigService } from '@api-modules/app-config/app-config.provider';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { AuthModule } from '@api-modules/auth/auth.module';
import { UserModule } from '@api-modules/user/user.module';
import { ProfileModule } from '@api-modules/profile/profile.module';
import { MediaItemModule } from '@api-modules/media-item/media-item.module';
import { PlaylistItemModule } from '@api-modules/playlist-item/playlist-item.module';
import { PlaylistModule } from '@api-modules/playlist/playlist.module';
import { SearchModule } from '@api-modules/search/search.module';
import { ShareItemModule } from '@api-modules/share-item/share-item.module';
import { ViewsModule } from '@api-modules/views/views.module';
import { LikesModule } from '@api-modules/likes/likes.module';
import { TagModule } from '@api-modules/tag/tag.module';
import { UserConnectionModule } from '@api-modules/user-connection/user-connection.module';

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
    ProfileModule,
    MediaItemModule,
    PlaylistItemModule,
    PlaylistModule,
    SearchModule,
    ViewsModule,
    ShareItemModule,
    LikesModule,
    TagModule,
    UserConnectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  constructor(private appConfigService: AppConfigService) {}
}

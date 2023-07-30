import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './modules/app-config/app-config.provider';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { MediaItemModule } from './modules/media-item/media-item.module';
import { PlaylistItemModule } from './modules/playlist-item/playlist-item.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { SearchModule } from './modules/search/search.module';
import { ShareItemModule } from './modules/share-item/share-item.module';


@Module({
  imports: [
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
    LoggerModule.forRoot(),
    MediaItemModule,
    PlaylistItemModule,
    PlaylistModule,
    SearchModule,
    ShareItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  constructor(private appConfigService: AppConfigService) {}
}

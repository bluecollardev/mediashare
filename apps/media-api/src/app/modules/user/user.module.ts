import { SesModule, SesService } from '@api-modules/nestjs-ses';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api-modules/auth/auth.module';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { AppConfigService } from '@api-modules/app-config/app-config.provider';
import { PlaylistService } from '@api-modules/playlist/playlist.service';
import { Playlist } from '@api-modules/playlist/entities/playlist.entity';
import { PlaylistItemService } from '@api-modules/playlist-item/playlist-item.service';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';
import { MediaItemService } from '@api-modules/media-item/media-item.service';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';
import { ShareItemModule } from '@api-modules/share-item/share-item.module';
import { JwtDecodeMiddleware } from '@api-core/middleware/jwt-decode.middleware';
import { UsersController } from './users.controller';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserConnection } from '@api-modules/user-connection/entities/user-connection.entity';
import { UserConnectionService } from '@api-modules/user-connection/user-connection.service';

@Module({
  imports: [
    SesModule.forRoot({
      SECRET: process.env['USER_CONNECTION_MODULE_SECRET'],
      AKI_KEY: process.env['USER_CONNECTION_MODULE_AKI_KEY'],
      REGION: process.env['USER_CONNECTION_REGION'],
    }),
    AuthModule,
    TypeOrmModule.forFeature([User, UserConnection, Playlist, PlaylistItem, MediaItem]),
    SesModule,
    ShareItemModule,
    AppConfigModule,
  ],
  controllers: [UserController, UsersController],
  providers: [PlaylistService, PlaylistItemService, MediaItemService, UserConnectionService, AppConfigService, SesService],
  exports: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtDecodeMiddleware).forRoutes(UsersController);
  }
}

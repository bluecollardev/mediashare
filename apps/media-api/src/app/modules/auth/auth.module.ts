import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { AppConfigService } from '@api-modules/app-config/app-config.provider';
import { UserService } from '@api-modules/user/user.service';
import { User } from '@api-modules/user/entities/user.entity';
import { Playlist } from '@api-modules/playlist/entities/playlist.entity';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { accessKey } from './keys';
import { UserConnection } from '@api-modules/user-connection/entities/user-connection.entity';

@Module({
  imports: [
    AppConfigModule,
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule],
        name: 'AUTH_CLIENT',

        useFactory: (configService: AppConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('authHost'),
            port: configService.get('authPort'),
          },
        }),
        inject: [AppConfigService],
      },
    ]),
    JwtModule.register({
      publicKey: accessKey,
      signOptions: { expiresIn: '10h' },
      verifyOptions: {
        // algorithms: ['RS256'],
        ignoreExpiration: true,
      },
    }),
    TypeOrmModule.forFeature([User, Playlist, PlaylistItem, MediaItem, ShareItem, UserConnection]),
  ],
  controllers: [],
  providers: [LocalStrategy, SessionSerializer, AuthService, UserService, ShareItemService],
  exports: [ClientsModule, SessionSerializer, LocalStrategy, AuthService, UserService, ShareItemService, AppConfigModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaItem } from '../../controllers/media-item/entities/media-item.entity';
import { MediaItemService } from '../../controllers/media-item/media-item.service';
import { Playlist } from '../../controllers/playlist/entities/playlist.entity';
import { User } from '../../controllers/user/entities/user.entity';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.provider';
import { PlaylistItem } from '../playlist-item/entities/playlist-item.entity';
import { ShareItemModule } from '../share-item/share-item.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { accessKey } from './keys';

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
            port: configService.get('authPort')
          }
        }),
        inject: [AppConfigService]
      }
    ]),
    JwtModule.register({
      publicKey: accessKey,
      signOptions: { expiresIn: '10h' },
      verifyOptions: {
        // algorithms: ['RS256'],
        ignoreExpiration: true
      }
    }),
    TypeOrmModule.forFeature([User, Playlist, PlaylistItem, MediaItem]),
    ShareItemModule
  ],
  controllers: [],
  providers: [LocalStrategy, SessionSerializer, AuthService, UserService],
  exports: [ClientsModule, SessionSerializer, LocalStrategy, AuthService, UserService, AppConfigModule]
})
export class AuthModule {}

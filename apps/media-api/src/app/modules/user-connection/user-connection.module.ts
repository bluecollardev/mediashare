import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { AppConfigService } from '@api-modules/app-config/app-config.provider';
import { SesModuleOptions } from '@api-modules/nestjs-ses/ses.struct';
import { Module } from '@nestjs/common';
import { AuthModule } from '@api-modules/auth/auth.module';
import { User } from '@api-modules/user/entities/user.entity';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@api-modules/user/user.service';
import { UserConnectionService } from './user-connection.service';
import { UserConnection } from './entities/user-connection.entity';
import { SesModule, SesService } from '@api-modules/nestjs-ses';

@Module({
  imports: [
    AppConfigModule,
    SesModule.registerAsync([
      {
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) => {
          const sesConfig: SesModuleOptions = {
            region: configService.get('sesModuleRegion'),
            akiKey: configService.get('sesModuleAkiKey'),
            secret: configService.get('sesModuleSecret'),
          };

          console.log(`[SesModule.registerAsync useFactory] ${JSON.stringify(sesConfig, null, 2)}`);
          return sesConfig;
        },
      },
    ]),
    TypeOrmModule.forFeature([User, UserConnection, ShareItem]),
    AuthModule,
  ],
  providers: [UserService, UserConnectionService, SesService],
  exports: [AppConfigModule, SesModule, UserService, UserConnectionService, SesService],
})
export class UserConnectionModule {}

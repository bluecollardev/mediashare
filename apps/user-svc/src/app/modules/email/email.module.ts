// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { EmailController } from './email.controller';
import { SesModule } from '../nestjs-ses/ses.module';
import { SesService } from '../nestjs-ses/ses.service';
import { UserService, UserDataService } from '../user/user.service';
import { UserConnection } from '../user-connection/entities/user-connection.entity';
import { UserConnectionModule } from '../user-connection/user-connection.module';
import {
  UserConnectionDataService,
  UserConnectionService,
} from '../user-connection/user-connection.service';
import { SesModuleOptions } from '../nestjs-ses/ses.struct';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserConnection]),
    UserConnectionModule,
    SesModule.registerAsync([
      {
        useFactory: () => {
          const sesConfig: SesModuleOptions = {
            // TODO: Finish this!
            // region: configService.get('sesModuleRegion'),
            // akiKey: configService.get('sesModuleAkiKey'),
            // secret: configService.get('sesModuleSecret'),
            region: '',
            akiKey: '',
            secret: '',
          };

          console.log(
            `[SesModule.registerAsync useFactory] ${JSON.stringify(
              sesConfig,
              null,
              2
            )}`
          );
          return sesConfig;
        },
      },
    ]),
  ],
  controllers: [EmailController],
  providers: [
    SesService,
    UserService,
    UserDataService,
    UserConnectionService,
    UserConnectionDataService,
  ],
  exports: [SesService],
})
export class EmailModule {}
/* export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtDecodeMiddleware).forRoutes(UsersController);
  }
} */

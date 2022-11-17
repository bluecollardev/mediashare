import { Module } from '@nestjs/common';
import { AuthModule } from '@api-modules/auth/auth.module';
import { User } from '@api-modules/user/entities/user.entity';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@api-modules/user/user.service';
import { UserConnectionService } from './user-connection.service';
import { UserConnection } from './entities/user-connection.entity';
import { SesModule } from '@api-modules/nestjs-ses';

console.log(process.env);

@Module({
  imports: [
    SesModule.forRoot({
      SECRET: process.env['USER_CONNECTION_MODULE_SECRET'],
      AKI_KEY: process.env['USER_CONNECTION_MODULE_AKI_KEY'],
      REGION: process.env['USER_CONNECTION_REGION'],
    }),
    TypeOrmModule.forFeature([User, UserConnection, ShareItem]),
    AuthModule,
  ],
  providers: [UserService, UserConnectionService, SesModule],
})
export class UserConnectionModule {}

import { Module } from '@nestjs/common';
import { UserConnectionService } from './user-connection.service';
import { UserConnectionController } from './user-connection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConnection } from './entities/user-connection.entity';
import { SesModule } from '@api-modules/nestjs-ses';

@Module({
  imports: [
    SesModule.forRoot({
      SECRET: process.env['USER_CONNECTION_MODULE_SECRET'],
      AKI_KEY: process.env['USER_CONNECTION_MODULE_AKI_KEY'],
      REGION: process.env['USER_CONNECTION_REGION'],
    }),
    TypeOrmModule.forFeature([UserConnection]),
  ],
  controllers: [UserConnectionController],
  providers: [UserConnectionService, SesModule],
})
export class UserConnectionModule {}

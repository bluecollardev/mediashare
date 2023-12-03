// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConnectionMapping } from './mappers/automapper.profile';
import { UserConnection } from './entities/user-connection.entity';
import {
  UserConnectionService,
  UserConnectionDataService,
} from './user-connection.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserConnection]), UserConnectionModule],
  providers: [
    UserConnectionService,
    UserConnectionDataService,
    UserConnectionMapping,
  ],
  exports: [UserConnectionService],
})
export class UserConnectionModule {}

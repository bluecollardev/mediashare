import { Module } from '@nestjs/common';
import { UserConnectionService } from './user-connection.service';
import { UserConnectionController } from './user-connection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConnection } from './entities/user-connection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserConnection])],
  controllers: [UserConnectionController],
  providers: [UserConnectionService],
})
export class UserConnectionModule {}

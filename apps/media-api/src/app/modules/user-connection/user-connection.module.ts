import { Module } from '@nestjs/common';
import { UserConnectionService } from './user-connection.service';
import { UserConnectionController } from './user-connection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConnection } from './entities/user-connection.entity';
import { SesModule } from '@nextnm/nestjs-ses';

@Module({
  imports: [
    SesModule.forRoot({
      SECRET: 'C7rXF5JVEWkecHcjay+nXnuf3fPu8ERpj7ZS6EOg',
      AKI_KEY: 'AKIA3ZSOCVIUBBEA4D2M',
      REGION: 'us-west-2',
    }),
    TypeOrmModule.forFeature([UserConnection]),
  ],
  controllers: [UserConnectionController],
  providers: [UserConnectionService],
})
export class UserConnectionModule {}

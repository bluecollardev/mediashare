import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm/repository/MongoRepository';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import { UserConnection } from './entities/user-connection.entity';

@Injectable()
export class UserConnectionService extends DataService<UserConnection, MongoRepository<UserConnection>> {
  constructor(
    @InjectRepository(UserConnection)
    repository: MongoRepository<UserConnection>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }

  async createUserConnection({ userId, connectionId }: CreateUserConnectionDto): Promise<UserConnection> {
    try {
      return await this.create({
        userId,
        connectionId,
      });
    } catch (error) {
      throw new error();
    }
  }
}

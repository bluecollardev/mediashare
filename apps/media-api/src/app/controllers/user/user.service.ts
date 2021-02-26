import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { PinoLogger } from 'nestjs-pino';
import { BcBaseEntity, DataService } from '@api';

@Injectable()
export class UserService extends DataService<User, MongoRepository<User>> {
  constructor(
    @InjectRepository(User)
    repository: MongoRepository<User>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }

  async checkIfUserExists(username: string) {
    const user = await super.findByQuery({ username });

    return user;
  }

  getUserByUsername(username: string) {
    return super.findByQuery({ username });
  }
}

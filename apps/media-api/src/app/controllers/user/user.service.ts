import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { DataService } from 'apps/media-api/src/core/models/data-provider.model';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserService extends DataService<User, MongoRepository<User>> {
  constructor(
    @InjectRepository(User)
    userRepository: MongoRepository<User>,
    @InjectPinoLogger(UserService.name)
    private readonly injectedLogger: PinoLogger
  ) {
    super(userRepository, new User(), injectedLogger);
  }
}

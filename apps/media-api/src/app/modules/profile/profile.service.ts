import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { DataService } from '@api';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService extends DataService<Profile, MongoRepository<Profile>> {
  constructor(
    @InjectRepository(Profile)
    userRepository: MongoRepository<Profile>,
    logger: PinoLogger
  ) {
    super(userRepository, logger);
  }
}

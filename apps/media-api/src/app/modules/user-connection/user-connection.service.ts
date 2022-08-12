import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm/repository/MongoRepository';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import { UserConnection } from './entities/user-connection.entity';
import { SesService } from '@nextnm/nestjs-ses';

// const options: SesEmailOptions = {
//   from: '',
//   to: '',
//   subject: '',
//   html: '',
// };

@Injectable()
export class UserConnectionService extends DataService<UserConnection, MongoRepository<UserConnection>> {
  constructor(
    @InjectRepository(UserConnection)
    repository: MongoRepository<UserConnection>,
    logger: PinoLogger,
    private sesService: SesService
  ) {
    super(repository, logger);
  }

  async createUserConnection({ userId, connectionId }: CreateUserConnectionDto): Promise<UserConnection> {
    try {
      const user = new ObjectId(userId);
      return await this.create({
        userId: user,
        connectionId,
      });
    } catch (error) {
      throw new error();
    }
  }

  async send(mail){
    const transport = await this.sesService.sendEmail(mail);
    return transport;
  }
}

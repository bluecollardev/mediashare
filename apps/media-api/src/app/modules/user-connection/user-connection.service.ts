import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm/repository/MongoRepository';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import { UserConnection } from './entities/user-connection.entity';
import { SesService } from '@api-modules/nestjs-ses';
import { UserService } from '@api-modules/user/user.service';

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
    private sesService: SesService,
    private userService: UserService
    
  ) {
    super(repository, logger);
  }

  async createUserConnection({ userId, connectionId }: CreateUserConnectionDto): Promise<UserConnection> {
    try {
      const user = new ObjectId(userId);

      // create each other
      await this.create({
        userId: connectionId ,
        connectionId: userId,
      });
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

  async userEmailAlreadyExits(email: string) {
    return await this.userService.findByQuery({ where: {email: email } })
  }
}

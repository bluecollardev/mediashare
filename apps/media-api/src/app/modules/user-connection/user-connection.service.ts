import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectIdGuard } from '@util-lib';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { clone } from 'remeda';
import { FindOptionsWhere } from 'typeorm';
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
      const userObjectId = ObjectIdGuard(userId);
      const connectionObjectId = ObjectIdGuard(connectionId);

      // Create the a pair of connection entities including the inverse relationship
      /* await this.create({
        userId: connectionId ,
        connectionId: connectionObjectId,
      }); */

      return await this.create({
        userId: userObjectId,
        connectionId: connectionObjectId,
      });

    } catch (error) {
      throw new error();
    }
  }

  async getUserConnections(id: ObjectId | string) {
    try {
      const userConnections = await this.repository
      .find({
        where: {
          $or: [
            { userId: ObjectIdGuard(id) },
            { connectionId: ObjectIdGuard(id) },
          ]
        } as FindOptionsWhere<UserConnection>
      })

      return clone(userConnections);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.getUserConnections ${error}`);
    }
  }

  async send(mail){
    return await this.sesService.sendEmail(mail);
  }

  async userEmailAlreadyExits(email: string) {
    return await this.userService.findByQuery({ where: {email: email } })
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectIdGuard } from '@util-lib';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { clone } from 'remeda';
import { FindOptionsWhere } from 'typeorm';
import { MongoRepository } from 'typeorm/repository/MongoRepository';
import { UserConnectionDto } from './dto/user-connection.dto';
import { UserConnection } from './entities/user-connection.entity';
import { DataService } from '@api';
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
    private userService: UserService,
  ) {
    super(repository, logger);
  }

  async createUserConnection({ userId, connectionId }: UserConnectionDto): Promise<UserConnection> {
    try {
      const userObjectId = ObjectIdGuard(userId);
      const connectionObjectId = ObjectIdGuard(connectionId);

      const userConnection = await this.create({
        userId: userObjectId,
        connectionId: connectionObjectId,
      });

      // Create the inverse relationship
      // If a UserConnection record exists for both users, both
      // users are allowed to see each other's public shares
      await this.create({
        userId: connectionObjectId,
        connectionId: userObjectId,
      });

      return userConnection;
    } catch (error) {
      this.logger.error(`${this.constructor.name}.createUserConnection ${error}`);
      throw error;
    }
  }

  async getUserConnections(userId: ObjectId | string) {
    try {
      const userConnections = await this.repository.find({
        where: {
          userId: ObjectIdGuard(userId),
        } as FindOptionsWhere<UserConnection>,
      });

      return clone(userConnections);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.getUserConnections ${error}`);
    }
  }

  async removeUserConnection({ userId, connectionId }: Partial<UserConnectionDto>): Promise<void> {
    try {
      if (!userId || !connectionId) {
        throw new Error('userId and connectionId are both required parameters');
      }

      const query = [{
        $match: {
          $or: [
            {
              $and: [
                { userId: ObjectIdGuard(userId) },
                { connectionId: ObjectIdGuard(connectionId) }
              ]
            },
            {
              $and: [
                { userId: ObjectIdGuard(connectionId) },
                { connectionId: ObjectIdGuard(userId) }
              ]
            }
          ],
        }
      }];
      const userConnections = await this.repository.aggregate(query).toArray();
      await this.repository.remove(userConnections);

    } catch (error) {
      this.logger.error(`${this.constructor.name}.removeUserConnection ${error}`);
      throw error;
    }
  }

  async removeUserConnections(userConnections: Partial<UserConnectionDto>[]): Promise<void> {
    try {
      const removeUserConnections = userConnections.map(async ({ userId, connectionId }) => {
        await this.removeUserConnection({ userId, connectionId });
      });
      await Promise.all(removeUserConnections);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.removeAllUserConnections ${error}`);
      throw error;
    }
  }

  async sendEmail(mail) {
    return await this.sesService.sendEmail(mail);
  }

  async userEmailAlreadyExists(email: string) {
    return await this.userService.findAllByQuery({ where: { email: email } });
  }
}

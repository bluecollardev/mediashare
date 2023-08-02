import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MongoRepository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { IdType } from '@mediashare/shared';
import { ObjectIdGuard } from '@mediashare/core/guards';
import { DataService } from '@mediashare/core/services/data-provider.service';
import { UserConnection } from './entities/user-connection.entity';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import { UserConnectionDto } from './dto/user-connection.dto';
import { ApiErrorResponse, ApiErrorResponses } from '@mediashare/core/errors/api-error';


// const options: SesEmailOptions = {
//   from: '',
//   to: '',
//   subject: '',
//   html: '',
// };

@Injectable()
export class UserConnectionDataService extends DataService<UserConnection, MongoRepository<UserConnection>> {
  constructor(
    @InjectRepository(UserConnection) repository: MongoRepository<UserConnection>,
    logger: PinoLogger,
  ) {
    super(repository, logger);
  }
}

@Injectable()
export class UserConnectionService {
  constructor(
    protected dataService: UserConnectionDataService,
    @InjectMapper() private readonly classMapper: Mapper,
    // private sesService: SesService,
    protected logger: PinoLogger,
  ) {}

  async create(createUserConnectionDto: CreateUserConnectionDto): Promise<UserConnectionDto> {
    const errors = await this.dataService.validateDto(CreateUserConnectionDto, createUserConnectionDto);
    if (errors) throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));

    const { userId, connectionId } = createUserConnectionDto;
    if (userId === connectionId) {
      const msg = `${this.constructor.name}.createUserConnection userId cannot be the same as connectionId`;
      this.logger.error(msg);
      throw new Error(msg);
    }

    const rel1 = await this.classMapper.mapAsync({
      userId: userId,
      connectionId: connectionId,
    } as CreateUserConnectionDto, CreateUserConnectionDto, UserConnection);

    const rel2 = await this.classMapper.mapAsync({
      userId: connectionId,
      connectionId: userId,
    } as CreateUserConnectionDto, CreateUserConnectionDto, UserConnection);

    await Promise.all([
      this.dataService.create(rel1),
      this.dataService.create(rel2)
    ]);

    return await this.classMapper.mapAsync(rel1, UserConnection, UserConnectionDto);
  }

  async findConnections(userId: IdType): Promise<UserConnectionDto[]> {
    const entities = await this.dataService.repository.find({
      where: {
        userId: ObjectIdGuard(userId),
      } as FindOptionsWhere<UserConnection>,
    });

    const results = entities.map(async (entity) =>
      await this.classMapper.mapAsync(entity, UserConnection, UserConnectionDto));

    return Promise.all(results);
  }

  async remove({ userId, connectionId }: Partial<UserConnectionDto>): Promise<void> {
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
    const userConnections = await this.dataService.repository.aggregate(query).toArray();
    await this.dataService.repository.remove(userConnections);
  }

  async removeMany(userConnections: Partial<UserConnectionDto>[]): Promise<void> {
    const removeConnections = async ({ userId, connectionId }) => {
      await this.remove({ userId, connectionId });
    };
    const removeUserConnections = userConnections.map(removeConnections);
    await Promise.all(removeUserConnections);
  }

  // TODO: Move this out so we don't have dependencies
  /* async sendEmail(mail) {
    return await this.sesService.sendEmail(mail);
  } */

  // TODO: Move this out so we don't have dependencies
  /* async findUsersByEmail(email: string) {
    return await this.userService.dataService.findAllByQuery({ where: { email: email.toLowerCase() } });
  } */
}

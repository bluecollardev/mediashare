import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoFindOneOptions } from 'typeorm/find-options/mongodb/MongoFindOneOptions';
import { ObjectIdGuard } from '@mediashare/core/guards';
import { DataService } from '@mediashare/core/services';
import { IdType } from '@mediashare/shared';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { ApiErrorResponse, ApiErrorResponses } from '@mediashare/core/errors/api-error';

@Injectable()
export class UserDataService extends DataService<User, MongoRepository<User>> {
  constructor(
    @InjectRepository(User) repository: MongoRepository<User>,
    logger: PinoLogger,
  ) {
    super(repository, logger);
  }
}

/**
 * TODO: classMapper is not mapping _id fields correctly! Fix this!
 */
@Injectable()
export class UserService {
  constructor(
    public dataService: UserDataService,
    @InjectMapper() private readonly classMapper: Mapper,
    protected logger: PinoLogger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const errors = await this.dataService.validateDto(CreateUserDto, createUserDto);
    if (errors) throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = this.classMapper.map(createUserDto, CreateUserDto, User);
    const result = await this.dataService.create(entity);
    return this.classMapper.mapAsync(result, User, UserDto);
  }

  async update(userId: IdType, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const errors = await this.dataService.validateDto(UpdateUserDto, updateUserDto);
    if (errors) throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = this.classMapper.map(updateUserDto, UpdateUserDto, User);
    const result = await this.dataService.update(userId, entity);
    return await this.classMapper.mapAsync(result, User, UserDto);
  }

  async remove(id: IdType) {
    return this.dataService.remove(id);
  }

  async findOne(id: IdType) {
    return this.dataService.findOne(id);
  }

  async findByQuery(query: MongoFindOneOptions<User>) {
    return this.dataService.findByQuery(query);
  }

  // TODO: Use mapper
  findById(id: IdType) {
    return this.dataService.repository
      .aggregate([
        { $match: { _id: ObjectIdGuard(id) } },
        {
          $replaceRoot: {
            newRoot: {
              _id: '$_id',
              username: '$username',
              email: '$email',
              firstName: '$firstName',
              lastName: '$lastName',
              phoneNumber: '$phoneNumber',
              role: '$role',
              imageSrc: '$imageSrc',
              // TODO: Can we remove author from here?
              authorId: '$_id',
              author: '$username',
              authorImage: '$imageSrc',
              authorName: { $concat: ['$firstName', ' ', 'lastName'] },
              transactionId: '$transactionId',
              transactionDate: '$transactionDate',
              transactionEndDate: '$transactionEndDate',
            },
          },
        },
      ])
      .next();
  }

  // TODO: Use mapper
  findByIds(ids: IdType[]) {
    return this.dataService.repository
      .aggregate([
        { $match: { _id: { $in: [...ids] } } },
        {
          $replaceRoot: {
            newRoot: {
              _id: '$_id',
              username: '$username',
              email: '$email',
              firstName: '$firstName',
              lastName: '$lastName',
              phoneNumber: '$phoneNumber',
              role: '$role',
              imageSrc: '$imageSrc',
              // TODO: Can we remove author from here?
              authorId: '$_id',
              author: '$username',
              authorImage: '$imageSrc',
              authorName: { $concat: ['$firstName', ' ', 'lastName'] },
              transactionId: '$transactionId',
              transactionDate: '$transactionDate',
              transactionEndDate: '$transactionEndDate',
            },
          },
        },
      ])
      .toArray();
  }

  async findMany() {
    return await this.dataService.repository
      .aggregate([
        // { $lookup: { from: 'share_item', localField: '_id', foreignField: 'userId', as: 'sharedMediaItems' } },
        // { $addFields: { shared: '$sharedMediaItems' } },
        {
          $group: {
            _id: '$_id',
            username: { $first: '$username' },
            email: { $first: '$email' },
            sub: { $first: '$sub' },
            phoneNumber: { $first: '$phoneNumber' },
            firstName: { $first: '$firstName' },
            lastName: { $first: '$lastName' },
            createdAt: { $first: '$createdAt' },
            updatedDate: { $first: '$updatedDate' },
            role: { $first: '$role' },
            imageSrc: { $first: '$imageSrc' },
            // TODO: Can we remove this from here? We have to anyway now...
            //  ...since we split users out into its own microservice
            // sharedMediaItems: { $first: '$sharedMediaItems' },
            transactionId: '$transactionId',
            transactionDate: '$transactionDate',
            transactionEndDate: '$transactionEndDate',
          },
        },
      ])
      .toArray();
  }
}

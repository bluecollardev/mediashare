import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PinoLogger, Logger } from 'nestjs-pino';
import { DataService } from '@api';
import { ClientProxy } from '@nestjs/microservices';

import { User } from '../../controllers/user/entities/user.entity';
import { ObjectId } from 'mongodb';
import { BcRolesType } from 'libs/core/src/lib/models/roles.enum';
import { CreateUserDto } from '../../controllers/user/dto/create-user.dto';
import { compareSync } from 'bcrypt';
import { AuthService } from './auth.service';
import { UpdateUserDto } from '../../controllers/user/dto/update-user.dto';
import * as R from 'remeda';

@Injectable()
export class UserService extends DataService<User, MongoRepository<User>> {
  constructor(
    @InjectRepository(User)
    repository: MongoRepository<User>,
    logger: PinoLogger,
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
    private authSvc: AuthService
  ) {
    super(repository, logger);
  }

  validateToken({ token, idToken }: { token: string; idToken: string }) {
    const { email, phone_number: phoneNumber } = this.authSvc.decodeIdToken(idToken);

    const { username, sub } = this.authSvc.validateToken(token);
    return { email, phoneNumber, username, sub };
  }

  setRoles(_id: string, roles: BcRolesType[]) {
    return this.client.send({ role: 'auth', cmd: 'setRoles' }, { _id, roles }).toPromise();
  }
  updateUser({ userId, updateUserDto }: { userId: ObjectId; updateUserDto: UpdateUserDto }) {
    return this.update(userId, R.omit(updateUserDto, ['role']));
  }

  getUserById(id: ObjectId) {
    return this.repository
      .aggregate([
        {
          $match: {
            _id: id,
          },
        },
        {
          $lookup: {
            from: 'share_item',
            localField: '_id',
            foreignField: 'userId',
            as: 'shareItems',
          },
        },

        {
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'createdBy',
            as: 'likes',
          },
        },
        {
          $lookup: {
            from: 'share_item',
            localField: '_id',
            foreignField: 'createdBy',
            as: 'shares',
          },
        },
        {
          $addFields: { shared: '$shareItems' },
        },

        {
          $unwind: {
            path: '$shareItems',
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'shareItems.createdBy',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $unwind: {
            path: '$author',
            preserveNullAndEmptyArrays: false,
          },
        },

        {
          $lookup: {
            from: 'playlist',
            localField: 'shareItems.playlistId',
            foreignField: '_id',
            as: 'playlist',
          },
        },

        {
          $unwind: {
            path: '$playlist',
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                '$playlist',
                {
                  _id: '$shareItems.userId',
                  author: '$author.username',
                  authorId: '$author._id',
                  authorImage: '$author.imageSrc',
                  authorName: { $concat: ['$author.firstName', ' ', '$author.lastName'] },
                  createdAt: '$shareItems.createdAt',
                  createdBy: '$shareItems.createdBy',
                  email: '$email',
                  firstName: '$firstName',
                  lastName: '$lastName',
                  likesCount: { $size: '$likes' },
                  phoneNumber: '$phoneNumber',
                  playlistId: '$playlist._id',
                  read: '$shareItems.read',
                  role: '$role',
                  sharedCount: { $size: '$shared' },
                  shareItemId: '$shareItems._id',
                  sharesCount: { $size: '$shares' },
                  userImg: '$imageSrc',
                  username: '$username',
                },
              ],
            },
          },
        },

        {
          $group: {
            _id: '$_id',
            imageSrc: { $first: '$userImg' },
            firstName: { $first: '$firstName' },
            lastName: { $first: '$lastName' },
            email: { $first: '$email' },
            role: { $first: '$role' },
            phoneNumber: { $first: '$phoneNumber' },
            username: { $first: '$username' },
            sharedCount: { $first: '$sharedCount' },
            sharesCount: { $first: '$sharesCount' },
            likesCount: { $first: '$likesCount' },

            sharedItems: {
              $push: '$$ROOT',
            },
          },
        },
      ])
      .next();
  }
}

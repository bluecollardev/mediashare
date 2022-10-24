import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { DataService } from '@api';
import { ClientProxy } from '@nestjs/microservices';
import { ObjectId } from 'mongodb';
import { BcRolesType } from 'libs/core/src/lib/models/roles.enum';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '@api-modules/auth/auth.service';
import { omit } from 'remeda';

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

  // TODO: Finish this!
  validateToken({ token, idToken }: { token: string; idToken: string }) {
    const { email, phone_number: phoneNumber } = this.authSvc.decodeIdToken(idToken);

    const { username, sub } = this.authSvc.validateToken(token);
    return { email, phoneNumber, username, sub };
  }

  setRoles(_id: string, roles: BcRolesType[]) {
    return this.client.send({ role: 'auth', cmd: 'setRoles' }, { _id, roles }).toPromise();
  }

  updateUser({ userId, updateUserDto }: { userId: string; updateUserDto: UpdateUserDto }) {
    return this.update(new ObjectId(userId), omit(updateUserDto, ['role']));
  }

  getUserById(id: string) {
    return this.repository
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
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
              // TODO: Can we remove author from here?
              imageSrc: '$imageSrc',
              authorId: '$_id',
              author: '$username',
              authorImage: '$imageSrc',
              authorName: { $concat: ['$firstName', ' ', 'lastName'] },
            },
          },
        },
      ])
      .next();
  }

  getUsersByIds(ids: ObjectId[]) {
    return this.repository
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
              // TODO: Can we remove author from here?
              imageSrc: '$imageSrc',
              authorId: '$_id',
              author: '$username',
              authorImage: '$imageSrc',
              authorName: { $concat: ['$firstName', ' ', 'lastName'] },
            },
          },
        },
      ])
      .toArray();
  }

  async getUserAll() {
    return await this.repository
      .aggregate([
        { $lookup: { from: 'share_item', localField: '_id', foreignField: 'userId', as: 'sharedMediaItems' } },
        { $addFields: { shared: '$sharedMediaItems' } },
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
            sharedMediaItems: { $first: '$sharedMediaItems' },
          },
        },
      ])
      .toArray();
  }

  async getUserAllWithJwt(jwt: string) {
    const result = await this.authSvc.validateToken(jwt);
    const users = await this.getUserAll();
    return users.filter((e) => e.email != result.username);
  }
}

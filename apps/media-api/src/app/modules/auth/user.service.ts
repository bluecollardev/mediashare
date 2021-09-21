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

  async checkIfUserExists(username: string) {
    const user = await this.findByQuery({ username });

    return !!user;
  }

  validateToken({ token, idToken }: { token: string; idToken: string }) {
    const { email, phone_number } = this.authSvc.decodeIdToken(idToken);

    const { username, sub } = this.authSvc.validateToken(token);
    return { email, phone_number, username, sub };
  }

  setRoles(_id: string, roles: BcRolesType[]) {
    return this.client.send({ role: 'auth', cmd: 'setRoles' }, { _id, roles }).toPromise();
  }

  getAuthUser(user: { _id: ObjectId }) {
    return this.client.send({ role: 'auth', cmd: 'get' }, user).toPromise();
  }

  async createUser(user: Pick<User, 'sub' | 'email' | 'phoneNumber' | 'username'>): Promise<User> {
    const { username, ...rest } = user;
    const userEntity = await this.create({ username: username.toLowerCase(), ...rest });

    return userEntity;
  }

  async login(user, _id) {
    const { password, ...userFields } = user;
    const payload = { userFields, sub: _id };

    return {
      ...userFields,
      accessToken: this.authSvc.sign(payload, _id)
    };
  }
}

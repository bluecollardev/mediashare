import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { DataService } from '@api';
import { ClientProxy } from '@nestjs/microservices';

import { catchError, timeout } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { User } from '../../controllers/user/entities/user.entity';
import { ObjectId } from 'mongodb';
import { BcRolesType } from 'libs/core/src/lib/models/roles.enum';
import { AuthUserInterface } from '@core-lib';

@Injectable()
export class UserService extends DataService<User, MongoRepository<User>> {
  constructor(
    @InjectRepository(User)
    repository: MongoRepository<User>,
    logger: PinoLogger,
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy
  ) {
    super(repository, logger);
  }

  async checkIfUserExists(username: string) {
    const user = await super.findByQuery({ username });

    return user;
  }

  getUserByUsername(username: string) {
    return super.findByQuery({ username });
  }

  createUser(user: { username: string; password: string; _id: string }): Promise<AuthUserInterface> {
    return this.client
      .send({ role: 'auth', cmd: 'create' }, user)
      .pipe(
        timeout(5000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            return throwError(new RequestTimeoutException());
          }
          return throwError(err);
        })
      )
      .toPromise();
  }

  loginUser(login: { username: string; password: string }) {
    return this.client.send({ role: 'auth', cmd: 'login' }, login).toPromise();
  }

  validateUser(params: { _id: string; token: string }) {
    return this.client.send({ role: 'auth', cmd: 'validate' }, params);
  }

  findAllSharedMediaItemsByUserId(_id: string | ObjectId) {
    const userId = typeof _id === 'string' ? new ObjectId(_id) : _id;
    return this.findByQuery({ _id: userId });
  }

  setRoles(_id: string, roles: BcRolesType[]) {
    return this.client.send({ role: 'auth', cmd: 'setRoles' }, { _id, roles }).toPromise();
  }

  getAuthUser(user: { _id: string }) {
    return this.client.send({ role: 'auth', cmd: 'get' }, user).toPromise();
  }

  aggregatePlaylistsByUser({ userId }: { userId: ObjectId }) {}
}

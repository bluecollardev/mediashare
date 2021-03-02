import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { PinoLogger } from 'nestjs-pino';
import { DataService } from '@api';
import { ClientProxy } from '@nestjs/microservices';

import { catchError, timeout } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';

@Injectable()
export class UserService extends DataService<User, MongoRepository<User>> {
  constructor(
    @InjectRepository(User)
    repository: MongoRepository<User>,
    logger: PinoLogger,
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy // private readonly jwtService: JwtService
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

  createUser(user: { username: string; password: string }) {
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
}

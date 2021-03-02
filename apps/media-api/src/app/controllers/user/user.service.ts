import { HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { PinoLogger } from 'nestjs-pino';
import { DataService } from '@api';
import { ClientProxy } from '@nestjs/microservices';

import { JwtService } from '@nestjs/jwt';

import { catchError, timeout } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { AUTH_CLIENT } from '@core-lib';

@Injectable()
export class UserService extends DataService<UserEntity, MongoRepository<UserEntity>> {
  constructor(
    @InjectRepository(UserEntity)
    repository: MongoRepository<UserEntity>,
    logger: PinoLogger,
    @Inject(AUTH_CLIENT)
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

  createUser(user: string) {
    return this.client
      .send({ role: 'auth', cmd: 'create' }, { user })
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
}

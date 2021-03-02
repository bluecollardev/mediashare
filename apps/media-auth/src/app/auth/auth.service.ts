import { Injectable, Logger, RequestTimeoutException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';

import { InsertResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { AuthUser } from './auth-user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly userRepository: Repository<AuthUser>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(userToCheck: { username: string; password: string }) {
    const { username, password } = userToCheck;

    const user = await this.userRepository.findOne({ username });

    if (compareSync(password, user?.password)) {
      return user;
    }

    return null;
  }

  async createUser(user: { username: string; password: string; _id: string }): Promise<InsertResult> {
    const { username, password, _id } = user;
    const createdAt = new Date();
    const email = username;
    try {
      /**
       * Perform all needed checks
       */

      const userEntity = this.userRepository.create({
        email,
        password,
        createdAt,
        username,
        _id,
      });

      const res = await this.userRepository.insert(userEntity);

      Logger.log('createUser - Created user');

      return res;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  async login(user, _id) {
    const payload = { user, sub: _id };
    const { password, ...userFields } = user;

    return {
      ...userFields,
      accessToken: this.jwtService.sign(payload),
    };
  }

  validateToken(jwt: string) {
    const jwtResult = this.jwtService.verify(jwt);
    const {
      user: { username = null, _id = null },
    } = jwtResult;

    const hasUser = !!jwtResult;

    return hasUser ? { username, _id } : null;
  }
}

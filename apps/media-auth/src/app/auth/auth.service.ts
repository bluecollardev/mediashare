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

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ username, password });

    if (compareSync(password, user?.password)) {
      return user;
    }

    return null;
  }

  async createUser(user: any): Promise<InsertResult> {
    try {
      /**
       * Perform all needed checks
       */

      const userEntity = this.userRepository.create({ ...user, password: 'welcome1', user: user.email });

      const res = await this.userRepository.insert(userEntity);

      Logger.log('createUser - Created user');

      return res;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  async login(user) {
    const payload = { user, sub: user.id };

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}

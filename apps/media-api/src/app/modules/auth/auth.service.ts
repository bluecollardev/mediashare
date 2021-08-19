import { Injectable, Logger } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
    // super(userRepository, logger);
  }

  sign(user, _id) {
    const payload = { user, sub: _id };
    const { password, ...userFields } = user;

    return {
      ...userFields,
      accessToken: this.jwtService.sign(payload)
    };
  }

  validateToken(jwt: string) {
    const jwtResult = this.jwtService.verify(jwt);
    const {
      user: { username = null, _id = null }
    } = jwtResult;

    const hasUser = !!jwtResult;

    return hasUser ? { username, _id } : null;
  }
}

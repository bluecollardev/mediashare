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
      // _id: userFields,
      accessToken: this.jwtService.sign(payload)
    };
  }

  validateToken(jwt: string) {
    const { username, _id } = this.jwtService.verify(jwt).user.userFields;
    console.log('🚀 -----------------------------------------------------------------------------------------');
    console.log('🚀 ~ file: auth.service.ts ~ line 23 ~ AuthService ~ validateToken ~ jwtResult', username);
    console.log('🚀 -----------------------------------------------------------------------------------------');

    return username ? { username, _id } : null;
  }
}

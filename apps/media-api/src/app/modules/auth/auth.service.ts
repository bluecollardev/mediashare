import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwtoken from 'jsonwebtoken';
import { idKey } from './keys';

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
      accessToken: this.jwtService.sign(payload),
    };
  }

  decodeIdToken(jwt: string): any {
    return jwtoken.verify(jwt, idKey, { algorithms: ['RS256'] }, function (err, decodedToken) {
      // console.log('decodedToken ', decodedToken);
      const { email, phone_number } = decodedToken as any;
      return { email, phone_number };
    });
  }

  validateToken(jwt: string) {
    const jwtResult = this.jwtService.verify(jwt);
    const { username = null, sub = null } = jwtResult;
    const hasUser = !!jwtResult;
    return hasUser ? { username, sub } : null;
  }
}

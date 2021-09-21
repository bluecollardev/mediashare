import { Injectable, Logger } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as jwtoken from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';
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
      accessToken: this.jwtService.sign(payload)
    };
  }

  decodeIdToken(jwt: string): any {
    // const jwtResult = this.jwtService.verify(jwt);
    // console.log('🚀 -----------------------------------------------------------------------------------------');
    // console.log('🚀 ~ file: auth.service.ts ~ line 41 ~ AuthService ~ validateToken ~ jwtResult', jwtResult);
    // console.log('🚀 -----------------------------------------------------------------------------------------');

    const verify = jwtoken.verify(jwt, idKey, { algorithms: ['RS256'] }, function (err, decodedToken) {
      console.log('decodedToken ', decodedToken);
      const { email, phone_number } = decodedToken as any;
      return { email, phone_number };
    });
    return verify;
    // console.log(verify);
    // const {
    //   user: { username = null, _id = null }
    // } = jwtResult;

    // const hasUser = !!jwtResult;

    // return hasUser ? { username, _id } : null;
  }

  validateToken(jwt: string) {
    const jwtResult = this.jwtService.verify(jwt);

    // const verify = jwtoken.verify(jwt, pem, { algorithms: ['RS256'] }, function (err, decodedToken) {
    //   console.log('decodedToken ', decodedToken);
    //   return decodedToken;
    // });
    // console.log(verify);
    const { username = null, sub = null } = jwtResult;

    const hasUser = !!jwtResult;

    return hasUser ? { username, sub } : null;
  }
}

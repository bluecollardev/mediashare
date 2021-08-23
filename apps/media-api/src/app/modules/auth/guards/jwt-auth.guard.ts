import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwkToPem from 'jwk-to-pem';
import * as jwtoken from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context) {
    console.log(context.args);

    return super.canActivate(context);
    // console.log(can);
    //
    // return can;
  }
}

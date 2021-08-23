import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { accessKey } from './guards/user.guard';
import { jwk } from './jwt-config';
const JWK = jwk;
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessKey
      // secretOrKeyProvider: ()
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.email };
  }
}

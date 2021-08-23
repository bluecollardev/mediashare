import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { accessKey, idKey } from './guards/user.guard';
import { jwk } from './jwt-config';
const JWK = jwk;
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: idKey
      // secretOrKeyProvider: ()
    });
  }

  async validate(payload) {
    console.log('🚀 --------------------------------------------------------------------------------');
    console.log('🚀 ~ file: jwt.strategy.ts ~ line 17 ~ JwtStrategy ~ validate ~ payload', payload);
    console.log('🚀 --------------------------------------------------------------------------------');
    return { userId: payload.sub, username: payload.email };
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'this-is-my-secret-key',
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}

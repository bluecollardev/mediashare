import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
      // .replace( 'Bearer', '' ).replace( ' ', '' ),
      ignoreExpiration: true,
      secretOrKey: 'this-is-my-secret-key',
    });
  }

  async validate(payload) {
    return { id: payload.sub, user: payload.user };
  }
}

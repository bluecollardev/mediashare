import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
      ignoreExpiration: true,
      secretOrKey: configService.get('auth.secretSession')
    });
  }

  async validate(payload) {
    console.log('🚀 --------------------------------------------------------------------------------');
    console.log('🚀 ~ file: jwt.strategy.ts ~ line 15 ~ JwtStrategy ~ validate ~ payload', payload);
    console.log('🚀 --------------------------------------------------------------------------------');
    return { id: payload.sub, user: payload.user };
  }
}

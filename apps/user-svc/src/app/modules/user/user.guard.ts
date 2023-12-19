import { COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY } from '@nestjs-cognito/auth';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from './user.service';

export const USER_CONTEXT_PROPERTY = 'user';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userSvc: UserService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const payload = request[COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY];

    const idKey = 'sub';
    const sub = payload[`cognito:${idKey}`] || payload[idKey];

    const usernameKey = 'username';
    const username = payload[`cognito:${usernameKey}`] || payload[usernameKey];

    const emailKey = 'email';
    const email = payload[`cognito:${emailKey}`] || payload[emailKey];

    let user = await this.userSvc.findByQuery({
      where: { sub, username, email },
    });
    if (!user) {
      // eslint-disable-next-line no-useless-catch
      try {
        const phoneNumberKey = 'phone_number';
        const phoneNumber =
          payload[`cognito:${phoneNumberKey}`] || payload[phoneNumberKey];

        user = await this.userSvc.create({
          sub,
          username,
          email,
          phoneNumber,
          firstName: 'Anonymous',
          lastName: 'User',
          // TODO: All new users should probably be free, not subscribers, complete this!
          role: 'subscriber',
          // TODO: Replace this string!
          imageSrc:
            'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/assets/default-user.png',
        } as any);
      } catch (err) {
        throw err;
      }
    }
    request[USER_CONTEXT_PROPERTY] = user;
    return !!request[USER_CONTEXT_PROPERTY];
  }
}

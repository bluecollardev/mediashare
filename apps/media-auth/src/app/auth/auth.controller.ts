import { Controller, Logger, Post, UseGuards, Request } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    try {
      const res = this.authService.validateToken(data.jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }

  @MessagePattern({ role: 'auth', cmd: 'validate' })
  validateUser(data: { _id: string; token: string }) {
    return this.authService.validateToken(data.token);
  }

  @MessagePattern({ role: 'auth', cmd: 'login' })
  async loginUser(data: { username: any; password: string }) {
    const { username, password } = data;
    const user = await this.authService.validateUser({ username, password });
    Logger.log(user);
    if (!user) return null;

    return await this.authService.login(user, user._id);
  }

  @MessagePattern({ role: 'auth', cmd: 'create' })
  createUser(data: { username: string; password: string }) {
    return this.authService.createUser(data);
  }
}

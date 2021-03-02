import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    try {
      console.log(data.jwt);
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
  async loginUser(data: { username: string; password: string }) {
    const { username, password } = data;
    const user = await this.authService.validateUser({ username, password });
    Logger.log(user);
    if (!user) return null;

    return await this.authService.login(user, user.authId);
  }

  @MessagePattern({ role: 'auth', cmd: 'create' })
  createUser(data: { username: string; password: string; _id: string }) {
    return this.authService.createUser(data);
  }

  @MessagePattern({ role: 'auth', cmd: 'setRoles' })
  setRoles(data: { _id: string; roles: any }) {
    return this.authService.updateRoles(data);
  }
}

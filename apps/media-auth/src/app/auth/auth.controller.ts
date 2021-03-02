import { Controller, Logger, Post, UseGuards, Request } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

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
  validateUser(data: any) {
    return this.authService.validateToken(data);
  }

  @MessagePattern({ role: 'auth', cmd: 'login' })
  loginUser(data: any) {
    return this.authService.login(data);
  }

  @MessagePattern({ role: 'auth', cmd: 'create' })
  createUser(data: any) {
    return this.authService.createUser(data);
  }
}

import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UserConnectionService } from './user-connection.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';

@ApiTags('user-connection')
@Controller('user-connection')
export class UserConnectionController {
  constructor(private readonly userConnectionService: UserConnectionService) {}

  @Post()
  @ApiBody({ type: CreateUserConnectionDto })
  async createUserConnection(@Req() req: Request, @Res() res: Response) {
    try {
      const { userId, connectionId } = req.body as any;
      const result = await this.userConnectionService.createUserConnection({ userId, connectionId });
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new error();
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  HttpCode,
  Request,
} from '@nestjs/common';
import { Response, Request as Req } from 'express';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiHideProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { PlaylistService } from '../playlist/services/playlist.service';
import { MediaItemService } from '../media-item/media-item.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';

import * as R from 'remeda';
import { ObjectId } from 'mongodb';
import { conflictResponse } from '../../core/functors/http-errors.functor';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { LocalGuard } from '../../modules/auth/guards/local.guard';
import { UserService } from '../../modules/auth/user.service';
import { BcRolesType, BC_ROLES } from '@core-lib';
import { UserGetResponse, UserPostResponse } from './decorators/user-response.decorator';
import { createUserResponseDto } from './dto/create-user-response.dto';
import { Playlist } from '../playlist/entities/playlist.entity';
import { MediaItemDto } from '../media-item/dto/media-item.dto';
import { LoginDto } from './dto/login.dto';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';
import { SessionUserInterface } from '../../core/models/auth-user.model';
import { GetUser } from '../../core/decorators/user.decorator';
import { ObjectIdPipe } from '@mediashare/shared';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private playlistService: PlaylistService,
    private mediaItemService: MediaItemService,
    private shareItemService: ShareItemService
  ) {}

  @Post()
  @ApiResponse({ type: UserDto, status: 201, isArray: false })
  async create(@Body() createUserDto: CreateUserDto) {
    const { username, password, ...rest } = createUserDto;
    const existingUser = await this.userService.checkIfUserExists(username);
    if (existingUser) throw conflictResponse(username);

    const mongoUser = await this.userService.create({ ...rest, username });

    const postgresUser = await this.userService.createUser({ username, password, _id: mongoUser._id.toHexString() });

    return createUserResponseDto(mongoUser, postgresUser);
  }

  @UserGetResponse({ isArray: true })
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  @ApiBody({ type: LoginDto, required: true })
  async login(@Request() req: Req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: Req, @Res() res: Response) {
    try {
      req.logout();
    } catch {
      return res.status(HttpStatus.OK).send();
    }
  }

  @Get(':userId')
  @UserGetResponse()
  findOne(@Param('userId', ObjectIdPipe) userId: ObjectId): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Put(':userId')
  @UserPostResponse()
  update(
    @Param('userId', ObjectIdPipe) userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<Partial<User>> {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string): Promise<DeleteResult> {
    return this.userService.remove(userId);
  }

  @Get(':userId/playlists')
  @UserGetResponse({ type: Playlist, isArray: true })
  @ApiHideProperty()
  getPlaylists(@Param('userId', ObjectIdPipe) userId: ObjectId) {
    return this.playlistService.getPlaylistByUserId({ userId });
  }

  @Get(':id/media-items')
  @UserGetResponse({ type: MediaItemDto, isArray: true })
  async getMedia(@Param('id') id: string, @Res() res: Response) {
    const mediaItems = await this.mediaItemService.findMediaItemsByUserId(id);

    if (!mediaItems || mediaItems.length < 1) return res.status(HttpStatus.NOT_FOUND).send([]);

    return res.status(HttpStatus.OK).send(mediaItems);
  }

  @Get(':userId/share-items')
  @UserGetResponse({ type: ShareItem, isArray: true })
  async getShareItems(@Param('id') id: string) {
    const shareItems = this.shareItemService.findByQuery({ userId: new ObjectId(id) });

    return shareItems;
  }

  @Put(':userId/roles')
  @UserPostResponse()
  @ApiBody({ enum: BC_ROLES, isArray: true })
  setRoles(@Param('userId') id: string, @Body() params: { roles: BcRolesType[] }) {
    const { roles = [] } = params;
    return this.userService.setRoles(id, roles);
  }

  /* shared with others */
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('shared-items/:shareId')
  @ApiResponse({ type: UserDto, status: 200 })
  async readSharedItem(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId, @GetUser() user: SessionUserInterface) {
    const sharedItem = await this.shareItemService.update(shareId, { read: true });

    return sharedItem;
  }
}

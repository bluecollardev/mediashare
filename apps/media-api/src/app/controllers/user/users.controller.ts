import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, UseGuards, HttpCode } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiHideProperty, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { PlaylistService } from '../playlist/services/playlist.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';

import { ObjectId } from 'mongodb';
import { conflictResponse } from '../../core/functors/http-errors.functor';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { UserService } from '../../modules/auth/user.service';
import { BcRolesType, BC_ROLES } from '@core-lib';
import { UserGetResponse, UserPostResponse } from './decorators/user-response.decorator';
import { createUserResponseDto } from './dto/create-user-response.dto';
import { Playlist } from '../playlist/entities/playlist.entity';
import { SessionUserInterface } from '../../core/models/auth-user.model';
import { GetUser } from '../../core/decorators/user.decorator';
import { ObjectIdPipe } from '@mediashare/shared';
import { CreateDto } from '../../core/decorators/create-dto.decorator';
import RouteTokens from '../../modules/app-config.module.ts/constants/open-api.constants';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private playlistService: PlaylistService,
    private shareItemService: ShareItemService
  ) {}

  @Post()
  @ApiResponse({ type: UserDto, status: 201, isArray: false })
  async create(@CreateDto() createUserDto: CreateUserDto) {
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

  @Get(RouteTokens.USER_ID)
  @ApiParam({ name: 'userId', type: String, required: true })
  @UserGetResponse()
  findOne(@Param('userId', ObjectIdPipe) userId: ObjectId): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Put(RouteTokens.USER_ID)
  @ApiParam({ name: 'userId', type: String, required: true })
  @UserPostResponse()
  update(
    @Param('userId', ObjectIdPipe) userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<Partial<User>> {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(RouteTokens.USER_ID)
  @ApiParam({ name: 'userId', type: String, required: true })
  @UseGuards(JwtAuthGuard)
  remove(@Param('userId') userId: string): Promise<DeleteResult> {
    return this.userService.remove(userId);
  }

  @Get(':userId/playlists')
  @UserGetResponse({ type: Playlist, isArray: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @ApiHideProperty()
  getPlaylists(@Param('userId', ObjectIdPipe) userId: ObjectId) {
    return this.playlistService.getPlaylistByUserId({ userId });
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
  @ApiParam({ name: 'shareId', type: String, required: true })
  @ApiResponse({ type: UserDto, status: 200 })
  async readSharedItem(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId, @GetUser() user: SessionUserInterface) {
    const sharedItem = await this.shareItemService.update(shareId, { read: true });

    return sharedItem;
  }
}

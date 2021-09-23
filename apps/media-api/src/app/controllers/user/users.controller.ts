import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, UseGuards, HttpCode, Request } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiHideProperty, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { PlaylistService } from '../playlist/services/playlist.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';

import { ObjectId } from 'mongodb';

import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { UserService } from '../../modules/auth/user.service';
import { BcRolesType, BC_ROLES } from '@core-lib';
import { UserGetResponse, UserPostResponse } from './decorators/user-response.decorator';
import { ObjectIdPipe } from '@mediashare/shared';
import RouteTokens from '../../modules/app-config.module.ts/constants/open-api.constants';
import { PlaylistResponseDto } from '../playlist/dto/playlist-response.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserGuard } from '../../modules/auth/guards/user.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService, private playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @UserGetResponse({ isArray: true })
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(RouteTokens.USER_ID)
  @ApiParam({ name: 'userId', type: String, required: true })
  @UserGetResponse({ type: ProfileDto })
  findOne(@Param('userId', new ObjectIdPipe()) userId: ObjectId): Promise<User> {
    return this.userService.getUserById(userId);
  }

  @Delete(RouteTokens.USER_ID)
  @ApiParam({ name: 'userId', type: String, required: true })
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  remove(@Param('userId') userId: string): Promise<DeleteResult> {
    return this.userService.remove(userId);
  }
  @Put(RouteTokens.USER_ID)
  @UserPostResponse({ type: UserDto })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'userId', type: String, required: true })
  update(@Param('userId', new ObjectIdPipe()) userId: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ userId, updateUserDto });
  }
  @Get(':userId/playlists')
  @UserGetResponse({ type: PlaylistResponseDto, isArray: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @ApiHideProperty()
  getPlaylists(@Param('userId', new ObjectIdPipe()) userId: ObjectId) {
    return this.playlistService.getPlaylistByUserId({ userId });
  }

  @Put(':userId/roles')
  @UserPostResponse({ type: UserDto })
  @ApiBody({ enum: BC_ROLES })
  setRoles(@Param('userId') id: string, @Body() params: { roles: BcRolesType[] }) {
    const { roles = [] } = params;
    return this.userService.setRoles(id, roles);
  }

  /* shared with others */
}

import { Controller, Body, Param, UseGuards, Get, Put, Delete, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHideProperty, ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
// import { JwtAuthGuard } from '@api-modules/auth/guards/jwt-auth.guard';
import RouteTokens from '@api-modules/app-config/constants/open-api.constants';
import { BcRolesType, BC_ROLES } from '@core-lib';
import { UserGetResponse, UserPostResponse } from './user.decorator';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileDto } from './dto/profile.dto';
import { PlaylistService } from '@api-modules/playlist/playlist.service';
import { PlaylistResponseDto } from '@api-modules/playlist/dto/playlist-response.dto';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService, private playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @Get()
  @ApiBearerAuth()
  @UserGetResponse({ isArray: true })
  async findAll(@Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const result = await this.userService.getUserAllWithJwt(jwt);
    return result;
  }

  @Get(RouteTokens.USER_ID)
  @ApiParam({ name: 'userId', type: String, required: true })
  @UserGetResponse({ type: ProfileDto })
  async findOne(@Param('userId', new ObjectIdPipe()) userId: ObjectId): Promise<User> {
    const result = await this.userService.getUserById(userId);
    if (result !== null) {
      return result;
    }
    // If the aggregate fails due to the user not having shared items, result will be null
    return await this.userService.findOne(userId);
  }

  @Delete(RouteTokens.USER_ID)
  @ApiParam({ name: 'userId', type: String, required: true })
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  remove(@Param('userId') userId: string): Promise<DeleteResult> {
    return this.userService.remove(userId);
  }

  @Put(RouteTokens.USER_ID)
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'userId', type: String, required: true })
  @UserPostResponse({ type: UserDto })
  update(@Param('userId', new ObjectIdPipe()) userId: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ userId, updateUserDto });
  }

  @Get(':userId/playlists')
  @ApiParam({ name: 'userId', type: String, required: true })
  @ApiHideProperty()
  @UserGetResponse({ type: PlaylistResponseDto, isArray: true })
  getPlaylists(@Param('userId', new ObjectIdPipe()) userId: ObjectId) {
    return this.playlistService.getByUserId(userId);
  }

  // TODO: Remove this?
  @Put(':userId/roles')
  @ApiBody({ enum: BC_ROLES })
  @UserPostResponse({ type: UserDto })
  setRoles(@Param('userId') id: string, @Body() params: { roles: BcRolesType[] }) {
    const { roles = [] } = params;
    return this.userService.setRoles(id, roles);
  }

  // New Auth stuff
}

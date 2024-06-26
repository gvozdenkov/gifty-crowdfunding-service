import { Controller, Get, Body, Param, Query, Req, UseGuards, Patch } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsNull } from 'typeorm';
import { JwtAuthGuard } from '#auth/guard/jwt-auth.guard';
import { WishOwnResponseDto } from '#wish/dto/wish-own-response.dto';
import { WishResponseDto } from '#wish/dto/wish-response.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find')
  async findByFilter(@Query('email') email?: string, @Query('username') username?: string) {
    var user = await this.usersService.findMany({
      where: [{ username: username || IsNull() }, { email: email || IsNull() }],
    });

    return plainToInstance(UserPublicProfileResponseDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@Req() req: { user: User }) {
    return plainToInstance(UserProfileResponseDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async findMeWishes(@Req() req: { user: User }) {
    var user = await this.usersService.findOne({
      where: { id: req.user.id },
      relations: ['wishes'],
    });

    return plainToInstance(WishOwnResponseDto, user.wishes);
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    var user = await this.usersService.findOne({ where: { username } });

    return plainToInstance(UserPublicProfileResponseDto, user);
  }

  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string) {
    var user = await this.usersService.findOne({
      where: { username },
      relations: ['wishes'],
    });

    return plainToInstance(WishResponseDto, user.wishes);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: { user: User }) {
    var user = await this.usersService.update(req.user.id, updateUserDto);

    return plainToInstance(UserResponseDto, user);
  }
}

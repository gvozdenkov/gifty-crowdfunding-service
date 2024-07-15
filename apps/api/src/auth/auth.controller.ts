import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { User } from '#users/entities/user.entity';
import { UsersService } from '#users/users.service';
import { CreateUserDto } from '#users/dto/create-user.dto';
import { UserResponseDto } from '#users/dto/user-response.dto';
import { AuthService } from './auth.service';
import { SignInResponseDto } from './dto/signin-response.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto) {
    var user = await this.usersService.register(createUserDto);

    return plainToInstance(UserResponseDto, user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Req() req: { user: User }) {
    var res = await this.authService.login(req.user);

    return plainToInstance(SignInResponseDto, res);
  }
}

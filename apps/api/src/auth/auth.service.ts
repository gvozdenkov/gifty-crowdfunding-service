import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '#users/users.service';
import { HelperService } from '#helper/helper.service';
import { User } from '#users/entities/user.entity';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly helperService: HelperService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    var payload = { sub: user.id };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async validateUser(signInDto: SignInDto) {
    var { email, password } = signInDto;

    var user = await this.usersService.findOne({ where: { email } });

    var isPasswordMatch = await this.helperService.compare(password, user.password);

    if (!isPasswordMatch) throw new UnauthorizedException('Incorrect password');

    var { password: removedPassword, ...result } = user;

    return result;
  }
}

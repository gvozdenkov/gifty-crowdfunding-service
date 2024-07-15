import { User } from '#users/entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class CreateUserDto extends PickType(User, [
  'username',
  'about',
  'avatar',
  'email',
  'password',
]) {}

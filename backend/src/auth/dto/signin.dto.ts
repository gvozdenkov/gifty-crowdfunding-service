import { User } from '#users/entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class SignInDto extends PickType(User, ['email', 'password']) {}

import { User } from '#users/entities/user.entity';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserPublicProfileResponseDto extends PickType(User, [
  'id',
  'username',
  'about',
  'avatar',
  'email',
  'createdAt',
  'updatedAt',
]) {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  about: string;

  @Expose()
  avatar: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

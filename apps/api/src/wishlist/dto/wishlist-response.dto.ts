import { Expose, Type } from 'class-transformer';
import { UserPublicProfileResponseDto } from '#users/dto/user-public-profile-response.dto';
import { WishOwnResponseDto } from '#wish/dto/wish-own-response.dto';
import { PickType } from '@nestjs/swagger';
import { Wishlist } from '#wishlist/entities/wishlist.entity';

export class WishlistResponseDto extends PickType(Wishlist, [
  'id',
  'name',
  'description',
  'cover',
  'createdAt',
  'updatedAt',
]) {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  cover: string;

  @Type(() => UserPublicProfileResponseDto)
  @Expose()
  owner: UserPublicProfileResponseDto;

  @Type(() => WishOwnResponseDto)
  @Expose()
  wishes: WishOwnResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

import { OfferResponseDto } from '#offer/dto/offer-response.dto';
import { UserPublicProfileResponseDto } from '#users/dto/user-public-profile-response.dto';
import { Wish } from '#wish/entities/wish.entity';
import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class WishOwnResponseDto extends PickType(Wish, [
  'id',
  'name',
  'description',
  'image',
  'link',
  'price',
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
  image: string;

  @Expose()
  link: string;

  @Expose()
  price: number;

  @Expose()
  raised: number;

  @Expose()
  copied: number;

  @Type(() => OfferResponseDto)
  @Expose()
  offers: OfferResponseDto[];

  @Type(() => UserPublicProfileResponseDto)
  @Expose()
  owner: UserPublicProfileResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

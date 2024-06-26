/* eslint-disable import/no-cycle */
import { Expose, Type } from 'class-transformer';
import type { Relation } from 'typeorm';
import { WishResponseDto } from '#wish/dto/wish-response.dto';
import { UserPublicProfileResponseDto } from '#users/dto/user-public-profile-response.dto';

export class OfferResponseDto {
  @Expose()
  id: string;

  @Type(() => WishResponseDto)
  @Expose()
  wish: Relation<WishResponseDto>;

  @Expose()
  amount: number;

  @Expose()
  hidden: boolean;

  @Type(() => UserPublicProfileResponseDto)
  @Expose()
  user: UserPublicProfileResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

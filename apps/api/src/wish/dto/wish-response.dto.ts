/* eslint-disable import/no-cycle */
import { Expose, Type } from 'class-transformer';
import { OfferResponseDto } from '#offer/dto/offer-response.dto';
import { UserPublicProfileResponseDto } from '#users/dto/user-public-profile-response.dto';

export class WishResponseDto {
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

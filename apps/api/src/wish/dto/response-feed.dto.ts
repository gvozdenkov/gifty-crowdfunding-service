import { Expose, Type } from 'class-transformer';
import { OfferResponseDto } from '#offer/dto/offer-response.dto';
import { OwnerResponseDto } from './owner-response.dto';

export class ResponseFeedDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  raised: number;

  @Expose()
  copied: number;

  @Expose()
  image: string;

  @Expose()
  link: string;

  @Type(() => OwnerResponseDto)
  @Expose()
  owner: OwnerResponseDto;

  @Type(() => OfferResponseDto)
  @Expose()
  offers: OfferResponseDto;
}

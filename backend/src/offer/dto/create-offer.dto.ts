import { PickType } from '@nestjs/swagger';
import { Offer } from '#offer/entities/offer.entity';
import { IsString, IsUUID } from 'class-validator';

export class CreateOfferDto extends PickType(Offer, ['amount', 'hidden']) {
  @IsString()
  @IsUUID('all')
  wishId: string;
}

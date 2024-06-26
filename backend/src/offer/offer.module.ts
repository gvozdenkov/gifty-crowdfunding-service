import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishModule } from '#wish/wish.module';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { Offer } from './entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), WishModule],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}

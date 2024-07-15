import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from '#wish/entities/wish.entity';
import { WishModule } from '#wish/wish.module';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { Wishlist } from './entities/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Wish]), WishModule],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Wishlist
import { Wishlist } from '#wishlist/entities/wishlist.entity';
import { WishlistModule } from '#wishlist/wishlist.module';
import { WishlistService } from '#wishlist/wishlist.service';
import { WishlistController } from '#wishlist/wishlist.controller';
// Wish
import { Wish } from '#wish/entities/wish.entity';
import { WishModule } from '#wish/wish.module';
import { WishController } from '#wish/wish.controller';
import { WishService } from '#wish/wish.service';
// User
import { User } from '#users/entities/user.entity';
import { UsersModule } from '#users/users.module';
import { UsersService } from '#users/users.service';
import { UsersController } from '#users/users.controller';
// Offer
import { Offer } from '#offer/entities/offer.entity';
import { OfferModule } from '#offer/offer.module';
import { OfferService } from '#offer/offer.service';
import { OfferController } from '#offer/offer.controller';
// Auth
import { AuthModule } from '#auth/auth.module';
// App
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { HelperModule } from './helper/helper.module';

@Module({
  controllers: [UsersController, WishlistController, WishController, OfferController],
  providers: [UsersService, WishlistService, WishService, OfferService],
  imports: [
    AppConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User, Wishlist, Wish, Offer]),
    UsersModule,
    WishlistModule,
    WishModule,
    OfferModule,
    AuthModule,
    HelperModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { Wish } from './entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishController],
  providers: [WishService],
  exports: [WishService],
})
export class WishModule {}

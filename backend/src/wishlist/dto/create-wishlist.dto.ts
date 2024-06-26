import { Wishlist } from '#wishlist/entities/wishlist.entity';
import { PickType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class CreateWishlistDto extends PickType(Wishlist, ['name', 'description', 'cover']) {
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  wishIds: string[];
}

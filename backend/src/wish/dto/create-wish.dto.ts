import { Wish } from '#wish/entities/wish.entity';
import { PickType } from '@nestjs/swagger';

export class CreateWishDto extends PickType(Wish, [
  'name',
  'description',
  'price',
  'image',
  'link',
]) {}

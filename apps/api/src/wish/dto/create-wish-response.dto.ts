import { Expose } from 'class-transformer';

export class CreateWishResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  link: string;

  @Expose()
  image: string;

  @Expose()
  price: number;
}

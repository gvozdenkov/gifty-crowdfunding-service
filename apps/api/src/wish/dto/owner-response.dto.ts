import { Expose } from 'class-transformer';

export class OwnerResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  about: string;

  @Expose()
  avatar: string;
}

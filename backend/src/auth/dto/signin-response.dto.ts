import { Expose } from 'class-transformer';

export class SignInResponseDto {
  @Expose()
  accessToken: string;
}

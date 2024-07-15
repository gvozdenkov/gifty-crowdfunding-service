import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HelperService {
  compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  hash(password: string) {
    return bcrypt.hash(password, 10);
  }
}

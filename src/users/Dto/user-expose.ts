import { Expose } from 'class-transformer';

export class UserExpose {
  @Expose()
  id: string;

  @Expose()
  email: string;
}

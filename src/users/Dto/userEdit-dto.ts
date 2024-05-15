import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserEditDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}

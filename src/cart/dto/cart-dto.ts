import { IsOptional, IsString } from 'class-validator';

export class CartDto {
  @IsString()
  name: string;

  // @IsNumber()
  @IsOptional()
  price: number;

  // @IsNumber()
  @IsOptional()
  colors: number;

  @IsString()
  description: string;

  @IsString()
  picture: string;
}

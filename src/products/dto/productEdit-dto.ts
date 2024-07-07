import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductEditDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  colors: number;

  @IsOptional()
  @IsString()
  description: string;
}

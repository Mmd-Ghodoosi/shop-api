import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductEditDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  picture: string;
}

import { IsOptional, IsString } from 'class-validator';

export class productDto {
  @IsString()
  name: string;

  // @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  code: string;

  // @IsNumber()
  @IsOptional()
  colors: number;

  @IsString()
  description: string;
}

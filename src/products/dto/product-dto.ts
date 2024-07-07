import { IsOptional, IsString } from 'class-validator';

export class productDto {
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
}

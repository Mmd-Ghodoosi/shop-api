import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class productDto {
  @IsString()
  name: string;

  // @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  code: string;

  // @IsString()
  // picture: string;
}

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
//========================================
export class addProductDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsNumber()
  @MinLength(0)
  @Min(0)
  @MaxLength(100)
  price: number;

  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  description: string;

  @IsNumber()
  @Min(0)
  @MinLength(1)
  @MaxLength(1000)
  quantity: number;
}
//========================================

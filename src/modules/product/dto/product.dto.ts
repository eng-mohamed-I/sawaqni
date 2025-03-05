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
  @Min(0)
  price: number;

  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  description: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}
//========================================
export class updateProductDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;
  
    @IsNumber()
    @Min(0)
    price: number;
  
    @IsString()
    @MinLength(3)
    @MaxLength(1000)
    description: string;
  
    @IsNumber()
    @Min(0)
    quantity: number;
  }
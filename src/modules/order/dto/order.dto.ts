import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Product } from 'src/core/schemas/product.schema';
//=========================================================
export class addOrderDTO {
  @IsString()
  @IsOptional()
  coupon: string;

  @IsNotEmpty()
  products: [{ product: Product; quentity: number }];

  @IsString()
  @IsNotEmpty()
  payment_method: string;
}
//=========================================================

import { IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/core/schemas/product.schema';
//=========================================================
export class addOrderDTO {
  @IsString()
  @IsNotEmpty()
  coupon: string;

  @IsNotEmpty()
  products: [Product];

  @IsString()
  @IsNotEmpty()
  payment_method: string;
}
//=========================================================

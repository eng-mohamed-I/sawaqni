import { Controller } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(private _productService: ProductService) {}
}

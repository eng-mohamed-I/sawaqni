import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { addProductDTO } from '../dto/product.dto';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
//=========================================================
@Controller('product')
export class ProductController {
  constructor(private _productService: ProductService) {}
  //=========================================================
  // Add Product
  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  addProduct(
    @Req() req: any,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: addProductDTO,
  ) {
    return this._productService.addProduct(body, req);
  }
  //=========================================================
  // Get all products
  @Get('')
  getAllProducts() {
    return this._productService.getAllProducts();
  }
}

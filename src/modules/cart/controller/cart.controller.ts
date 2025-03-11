import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
//============================================================
@Controller('carts')
export class CartController {
  constructor(private _cartService: CartService) {}
  //============================================================
  @Post('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  addToCart(@Req() req: any, @Body() body: any) {
    return this._cartService.addToCart(req, body);
  }
  //============================================================
  @Get('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  getUserCart(@Req() req: any) {
    return this._cartService.getUserCart(req);
  }
  //============================================================
}

import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { WishlistService } from '../service/wishlist.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
//==========================================================
@Controller('wishlist')
export class WishlistController {
  constructor(private _wishListService: WishlistService) {}
  //==========================================================
  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  addWishList(@Req() req: any, @Body() body: any) {
    return this._wishListService.addWishList(req, body);
  }
  //==========================================================
}

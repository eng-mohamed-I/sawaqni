import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { WishlistService } from '../service/wishlist.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
import { addWishListDTO } from '../dto/wishlist.dto';
//==========================================================
@Controller('wishlist')
export class WishlistController {
  constructor(private _wishListService: WishlistService) {}
  //==========================================================
  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  addWishList(
    @Req() req: any,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: addWishListDTO,
  ) {
    return this._wishListService.addWishList(req, body);
  }
  //==========================================================
  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  getUserWishList(@Req() req: any) {
    return this._wishListService.getUserWishList(req);
  }
  //==========================================================
}

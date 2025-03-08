import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  @Post('user')
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
  @Get('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  getUserWishList(@Req() req: any) {
    return this._wishListService.getUserWishList(req);
  }
  //==========================================================
  @Put('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  deleteFromWishList(@Req() req: any, @Body() body: any) {
    return this._wishListService.deleteFromWishList(req, body);
  }
  //==========================================================
  // For Admin
  // Get All wishlists

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllWishList() {
    return this._wishListService.getAllWishList();
  }
  //==========================================================
  // Delete Wishlist

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteWishList(@Param('id') wishListId: any) {
    return this._wishListService.deleteWishList(wishListId);
  }
  //==========================================================
}

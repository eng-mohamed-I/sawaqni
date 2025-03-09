import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CouponService } from '../service/coupon.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
//===============================================================

@Controller('coupon')
export class CouponController {
  constructor(private _couponService: CouponService) {}
  //===============================================================
  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  addCoupon(@Req() req: any, @Body() body: any) {
    return this._couponService.addCoupon(req, body);
  }
  //===============================================================
}

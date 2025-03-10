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
import { CouponService } from '../service/coupon.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
import { addCouponDTO, updateCouponDTO } from '../dto/coupon.dto';
//===============================================================
@Controller('coupons')
export class CouponController {
  constructor(private _couponService: CouponService) {}
  //===============================================================
  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  addCoupon(
    @Req() req: any,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: addCouponDTO,
  ) {
    return this._couponService.addCoupon(req, body);
  }
  //===============================================================
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateCoupon(
    @Param('id') couponCode: any,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: updateCouponDTO,
  ) {
    return this.updateCoupon(couponCode, body);
  }
  //===============================================================
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteCoupon(@Param('id') couponId: any) {
    return this._couponService.deleteCoupon(couponId);
  }
  //===============================================================
  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllCoupons() {
    return this._couponService.getAllCoupons();
  }
  //===============================================================
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getCoupon(@Param('id') couponId: any) {
    return this.getCoupon(couponId);
  }
  //===============================================================
}

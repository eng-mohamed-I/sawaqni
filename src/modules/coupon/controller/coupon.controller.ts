import {
  Body,
  Controller,
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
import { addCouponDTO } from '../dto/coupon.dto';
//===============================================================

@Controller('coupon')
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
}

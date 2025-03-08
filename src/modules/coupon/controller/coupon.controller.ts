import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from 'src/core/schemas/coupon.schema';
import { CouponService } from '../service/coupon.service';
//===============================================================

@Controller('coupon')
export class CouponController {
  constructor(private _couponService: CouponService) {}
  //===============================================================
}

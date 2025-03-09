import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from 'src/core/schemas/coupon.schema';
//===============================================================
@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}
  //===============================================================
  async addCoupon(req: any, body: any) {
    const { code, discount_percentage, valid_until, is_active } = body;
    const { user } = req;

    const foundCoupon = await this.couponModel.findOne({ code: code });
    if (foundCoupon)
      throw new HttpException(
        'Coupon code already exist.',
        HttpStatus.CONFLICT,
      );

    const newCoupon = new this.couponModel({
      code,
      created_by: user.id,
      discount_percentage,
      valid_until,
      is_active,
    });

    return { message: 'Coupon code created successfully.', data: newCoupon };
  }
  //===============================================================
}

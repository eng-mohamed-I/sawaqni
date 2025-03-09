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
  async updateCoupon(couponCode: string, body: any) {
    const { is_active, valid_until, discount_percentage } = body;

    const coupon = await this.couponModel.findOneAndUpdate(
      { code: couponCode },
      { is_active, valid_until, discount_percentage },
      { new: true },
    );

    if (!coupon)
      throw new HttpException('Coupon not found.', HttpStatus.NOT_FOUND);

    return { message: 'Coupon updated successfully.', data: coupon };
  }
  //===============================================================
  async deleteCoupon(id: any) {
    const coupon = await this.couponModel.findByIdAndDelete(id);
    if (!coupon)
      throw new HttpException('Coupon not found.', HttpStatus.NOT_FOUND);

    return { message: 'Coupon deleted successfully.', data: coupon };
  }
  //===============================================================
  async getAllCoupons() {
    const coupons = await this.couponModel.find();

    return { message: 'Coupon founded.', data: coupons };
  }
  //===============================================================
  async getCoupon(id: any) {
    const coupon = await this.couponModel.findById(id);

    if (!coupon)
      throw new HttpException('Coupon not found.', HttpStatus.NOT_FOUND);

    return { message: 'Coupon founded', data: coupon };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from 'src/core/schemas/coupon.schema';
import { Order } from 'src/core/schemas/order.schema';
import { Product } from 'src/core/schemas/product.schema';
//=========================================================
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  //=========================================================
  async addOrder(body: any, req: any) {
    const { products, payment_method, coupon } = body;
    const { user } = req;

    let totalPrice = 0;
    let discount = 0;
    let finalPrice = 0;

    products.map(async (item: any) => {
      const foundProduct = await this.productModel.findById(item.product.id);

      if (!foundProduct || foundProduct.quantity < item.quantity)
        throw new HttpException(
          `${item.product.name} not found or quantity is not enough.`,
          HttpStatus.CONFLICT,
        );

      totalPrice += foundProduct.price * item.quantity;
    });

    const foundCoupon = await this.couponModel.findOne({ code: coupon });
    if (foundCoupon) {
      if (
        !foundCoupon.is_active ||
        new Date(foundCoupon.valid_until) < new Date()
      )
        throw new HttpException(
          'Invalid or expire coupon.',
          HttpStatus.CONFLICT,
        );

      discount = (foundCoupon.discount_percentage / 100) * totalPrice;
    }

    finalPrice = totalPrice - discount;

    const newOrder = new this.orderModel({
      user: user.id,
      price: totalPrice,
      discount,
      total_amount: finalPrice,
      payment_method,
    });
  }
}

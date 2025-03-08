import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from 'src/core/schemas/coupon.schema';
import { Order } from 'src/core/schemas/order.schema';
//=========================================================
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
  ) {}
  //=========================================================
}

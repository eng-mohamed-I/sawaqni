import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Coupon } from 'src/core/schemas/coupon.schema';
import { Order } from 'src/core/schemas/order.schema';
import { Product } from 'src/core/schemas/product.schema';
//===========================================================
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  //===========================================================
  async addOrder(body: any, req: any) {
    const { products, payment_method, coupon } = body;
    const { user } = req;

    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new HttpException(
        'Products list cannot be empty.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const productIds = products.map((item) => item.product);
    const foundProducts = await this.productModel.find({
      _id: { $in: productIds },
    });

    if (foundProducts.length !== products.length) {
      throw new HttpException(
        'One or more products not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    let totalPrice = 0;
    let discount = 0;
    let finalPrice = 0;

    for (const item of products) {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        throw new HttpException(
          `Invalid product ID: ${item.product}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const foundProduct = foundProducts.find((p) => p.id === item.product);

      if (!foundProduct || foundProduct.quantity < item.quantity) {
        throw new HttpException(
          `${foundProduct?.name || 'Product'} not found or quantity is insufficient.`,
          HttpStatus.CONFLICT,
        );
      }

      totalPrice += foundProduct.price * item.quantity;
    }

    if (coupon) {
      const foundCoupon = await this.couponModel.findOne({
        code: coupon,
        is_active: true,
        valid_until: { $gte: new Date() },
      });

      if (!foundCoupon) {
        throw new HttpException(
          'Invalid or expired coupon.',
          HttpStatus.CONFLICT,
        );
      }

      discount = (foundCoupon.discount_percentage / 100) * totalPrice;
    }

    finalPrice = totalPrice - discount;

    const newOrder = new this.orderModel({
      products,
      user: user.id,
      price: totalPrice,
      discount,
      total_amount: finalPrice,
      payment_method,
    });

    await newOrder.save();

    return { message: 'Order created successfully.', data: newOrder };
  }
  //===========================================================
  async getUserOrders(req: any) {
    const { user } = req;

    const foundOrders = await this.orderModel
      .find({ user: user._id })
      .populate('products.product');

    return { message: 'Orders found successfully.', data: foundOrders };
  }
  //===========================================================
  async getOrders() {
    const orders = await this.orderModel.find().populate('products.product');

    return { message: 'Order found successfully.', data: orders };
  }
}

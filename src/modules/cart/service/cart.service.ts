import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/core/schemas/cart.schema';
//============================================================
@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}
  //============================================================
  async addToCart(req: any, body: any) {
    const { user } = req;
    const { product } = body;

    let cart = await this.cartModel.findOne({ user: user._id });
    if (!cart) {
      cart = new this.cartModel({ user: user.id, products: [] });
    }

    const existingProduct = cart.products.find(
      (e) => e.product.toString() == product.product,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.products.push(product);
    }

    await cart.save();

    return { message: 'Product added successfully.', data: cart };
  }
  //============================================================
}

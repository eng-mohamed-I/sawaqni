import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Cart } from 'src/core/schemas/cart.schema';
import { Product } from 'src/core/schemas/product.schema';
//============================================================
@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  //============================================================
  async addToCart(req: any, body: any) {
    const { user } = req;
    const { product } = body;

    const foundProduct = await this.productModel.findById(product.product);
    if (!foundProduct) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    let cart = await this.cartModel.findOne({ user: user._id });
    if (!cart) {
      cart = new this.cartModel({ user: user.id, products: [] });
    }

    const existingProduct = cart.products.find(
      (e) => e.product.toString() === product.product,
    );

    if (existingProduct && existingProduct.quantity >= foundProduct.quantity) {
      throw new HttpException('Not enough stock.', HttpStatus.CONFLICT);
    }

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: product.product, quantity: 1 });
    }

    await cart.save();

    return { message: 'Product added successfully.', data: cart };
  }
  //============================================================
  async getUserCart(req: any) {
    const { user } = req;

    const cart = await this.cartModel.findOne({ user: user._id });

    return { message: 'Cart founded. ', data: cart };
  }
  //============================================================
  async deleteFromCart(req: any, body: any) {
    const { product } = body;
    const { user } = req;

    let cart = await this.cartModel.findOne({
      user: user._id,
    });

    if (!cart)
      throw new HttpException('Cart not found on cart.', HttpStatus.NOT_FOUND);

    const exitingProduct = cart.products.findIndex(
      (e) => e.product.toString() === product.product,
    );

    if (exitingProduct === -1) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    if (cart.products[exitingProduct].quantity === 1) {
      cart.products.splice(exitingProduct, 1);
    } else {
      cart.products[exitingProduct].quantity -= 1;
    }

    await cart.save();
    return { message: 'Product deleted successfully.', data: cart };
  }
  //============================================================
  async getCarts() {
    const carts = await this.cartModel.find();

    return { message: 'Carts founded.', data: carts };
  }
  //============================================================
  async deleteCart(id: any) {
    const cart = await this.cartModel.findByIdAndDelete(id);

    if (!cart) throw new HttpException('Cart not found.', HttpStatus.CONFLICT);

    return { message: 'Cart deleted succssfully.', data: cart };
  }
}

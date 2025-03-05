import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/core/schemas/product.schema';
//=========================================================
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  //=========================================================
  // Add product
  async addProduct(body: any) {
    const { name, price, description, quantity } = body;

    const newProduct = new this.productModel({
      name,
      price,
      description,
      quantity,
    });

    await newProduct.save();

    return { message: 'Product created successfully.', data: newProduct };
  }
  //=========================================================
  // Get all products
  async getAllProducts() {
    const products = await this.productModel.find();

    return { message: 'Products founded successfully.', data: products };
  }
  
}

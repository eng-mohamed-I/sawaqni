import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';
//=========================================================
@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  products: [Product];

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  discount: number;

  @Prop({ type: Number, required: true })
  total_amount: number;

  @Prop({ type: String, required: true, enum: ['paypal', 'strip'] })
  payment_method: string;

  @Prop({ type: String, required: true, enum: ['pending', 'paid', 'faild'] })
  payment_status: string;
}

//=========================================================
export const OrderSchema = SchemaFactory.createForClass(Order);

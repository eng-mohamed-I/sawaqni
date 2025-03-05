import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
//======================================================
@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: false, default: null })
  description: string;

  @Prop({ type: Number, default: 0 })
  quantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  created_by: User;
}
//======================================================
export const ProductSchema = SchemaFactory.createForClass(Product);

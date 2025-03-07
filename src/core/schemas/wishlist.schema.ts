import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
import { Product } from './product.schema';
//======================================================
@Schema({ timestamps: true, versionKey: false })
export class WishList {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  products: [Product];
}
//======================================================
export const WishLishSchema = SchemaFactory.createForClass(WishList);

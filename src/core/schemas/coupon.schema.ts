import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
//=========================================================
@Schema({ timestamps: true, versionKey: false })
export class Coupon {
  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  created_by: User;

  @Prop({ type: Number, required: true, default: 0 })
  discount_percentage: number;

  @Prop({ type: Date, required: true })
  valid_until: Date;

  @Prop({ type: Boolean, default: true })
  is_active: boolean;
}
//=======================================================
export const CouponSchema = SchemaFactory.createForClass(Coupon);

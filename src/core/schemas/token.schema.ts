import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
//=============================================================
@Schema({ timestamps: true, versionKey: false })
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: String, required: true })
  refresh_token: string;

  @Prop({ type: Date, default: Date.now, expires: 604800 })
  createdAt: Date;
}
//=============================================================
export const TokenSchema = SchemaFactory.createForClass(Token);

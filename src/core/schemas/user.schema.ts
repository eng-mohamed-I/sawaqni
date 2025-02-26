import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
//===================================================

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  full_name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: ['admin', 'user'], default: 'user' })
  role: string;

  @Prop({ type: Boolean, default: false })
  is_verified: boolean;

  @Prop({ type: Boolean, default: true })
  is_active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password
UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});

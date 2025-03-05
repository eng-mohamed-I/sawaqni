import { Schema, SchemaFactory } from '@nestjs/mongoose';
//======================================================
@Schema({ timestamps: true, versionKey: false })
export class Product {}

//======================================================
export const ProductSchema = SchemaFactory.createForClass(Product);

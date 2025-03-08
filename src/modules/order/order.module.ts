import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/core/schemas/order.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { Coupon, CouponSchema } from 'src/core/schemas/coupon.schema';
import { Product, ProductSchema } from 'src/core/schemas/product.schema';
//=========================================================
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
      { name: Coupon.name, schema: CouponSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
//=========================================================
export class OrderModule {}

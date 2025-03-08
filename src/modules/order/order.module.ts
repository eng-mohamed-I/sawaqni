import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/core/schemas/order.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';
//=========================================================
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
//=========================================================
export class OrderModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/core/schemas/cart.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';
//============================================================
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
//============================================================
export class CartModule {}

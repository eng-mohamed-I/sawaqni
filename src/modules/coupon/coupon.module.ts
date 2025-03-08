import { Module } from '@nestjs/common';
import { CouponController } from './controller/coupon.controller';
import { CouponService } from './service/coupon.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from 'src/core/schemas/coupon.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';
//===============================================================
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Coupon.name, schema: CouponSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
//===============================================================
export class CouponModule {}

import { Module } from '@nestjs/common';
import { WishlistController } from './controller/wishlist.controller';
import { WishlistService } from './service/wishlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WishLishSchema, WishList } from 'src/core/schemas/wishlist.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';
//===============================================
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WishList.name, schema: WishLishSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}

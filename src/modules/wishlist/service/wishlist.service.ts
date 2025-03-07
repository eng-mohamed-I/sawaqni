import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WishList } from 'src/core/schemas/wishlist.schema';
//==========================================================
@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(WishList.name) private wishListModel: Model<WishList>,
  ) {}
  //==========================================================
  async addWishList(req: any, id: any) {
    const { user } = req;
    let wishList = await this.wishListModel.findOne({ user: user._id });

    if (!wishList)
      wishList = new this.wishListModel({ user: user.id, products: [] });

    if (!wishList.products.includes(id)) wishList.products.push(id);

    await wishList.save();

    return { message: 'Product added successfully.', data: wishList };
  }
  //==========================================================
  async getUserWishList(req: any) {
    const { user } = req;

    let wishList = await this.wishListModel.findOne({ user: user._id });

    if (!wishList)
      wishList = new this.wishListModel({ user: user.id, products: [] });

    return { message: 'Wishlist founded.', data: wishList };
  }
}

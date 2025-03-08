import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  async addWishList(req: any, body: any) {
    const { user } = req;
    const { id } = body;

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
  //==========================================================
  async deleteFromWishList(req: any, body: any) {
    const { user } = req;
    const { id } = body;

    let wishList = await this.wishListModel.findOneAndUpdate(
      { user: user._id },
      { $pull: { products: id } },
      { new: true },
    );

    if (!wishList)
      throw new HttpException('WishList not found.', HttpStatus.NOT_FOUND);
    return {
      message: 'Wishlist updated successfully.',
      data: wishList,
    };
  }
  //==========================================================
  async getAllWishList() {
    const wishLists = await this.wishListModel.find();

    return { message: 'WishList founded.', data: wishLists };
  }
  //==========================================================
  async deleteWishList(id: string) {
    const deletedWishlist = await this.wishListModel.findByIdAndDelete(id);

    if (!deletedWishlist)
      throw new HttpException('Wishlist not found.', HttpStatus.NOT_FOUND);

    return { message: 'WishList deleted successfully.', data: deletedWishlist };
  }
}

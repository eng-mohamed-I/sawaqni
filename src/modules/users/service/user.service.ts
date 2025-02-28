import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
//=========================================================
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  //=========================================================
  // Get All Users

  async getAllUsers() {
    const users = await this.userModel.find();

    return { message: 'Users founded successfully.', data: users };
  }
  //=========================================================
  // Get Single User

  async getUser(id: any) {
    const foundUser = await this.userModel.findById(id);
    if (!foundUser)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    return { message: 'User founded successfully.', data: foundUser };
  }
  //=========================================================
}

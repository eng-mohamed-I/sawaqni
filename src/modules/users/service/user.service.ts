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
  // Add User

  async addUser(body: any) {
    const { full_name, email, password, role, is_verified, is_active } = body;

    const foundEmail = await this.userModel.findOne({email});
    if (foundEmail)
      throw new HttpException('Email already exist.', HttpStatus.CONFLICT);

    const newUser = new this.userModel({
      full_name,
      email,
      password,
      role,
      is_verified,
      is_active,
    });

    await newUser.save();

    return {
      message: 'User created successfully.',
      data: newUser,
    };
  }
}

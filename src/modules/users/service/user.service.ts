import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { ApiFeaturesService } from 'src/core/services/api-feature.service';
//=========================================================
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private _apiFeature: ApiFeaturesService,
  ) {}
  //=========================================================
  // Get All Users

  async getAllUsers(query: any) {
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

    const foundEmail = await this.userModel.findOne({ email });
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
  //=========================================================
  // Delete User

  async deleteUser(id: any) {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    return {
      message: 'User deleted successfully.',
      data: user,
    };
  }
  //=========================================================
  // Update User

  async updateUser(userId: any, body: any) {
    const { full_name, role, is_active, is_verified } = body;
    const foundUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        full_name,
        role,
        is_active,
        is_verified,
      },
      {
        new: true,
      },
    );

    if (!foundUser)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    return {
      message: 'User updated successfully.',
      data: foundUser,
    };
  }
}

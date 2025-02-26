import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Register
  async register(body: any) {
    const { full_name, email, password } = body;

    const foundEmail = await this.userModel.findOne({ email: email });
    if (foundEmail)
      throw new HttpException('Email already token.', HttpStatus.CONFLICT);

    const newUser = new this.userModel({ full_name, email, password });

    await newUser.save();

    return new HttpException('User created successfully', HttpStatus.CREATED);
  }
}

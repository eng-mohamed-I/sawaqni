import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//=====================================================
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private _jwtService: JwtService,
  ) {}
  //=========================================================
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
  //=========================================================
  // Login
  async login(body: any) {
    const { email, password } = body;

    const foundUser = await this.userModel.findOne({ email: email });

    if (!foundUser || !bcrypt.compareSync(password, foundUser.password))
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.CONFLICT,
      );

    const payload = { sub: foundUser.id };

    return {
      message: 'Login successfully',
      access_token: await this._jwtService.signAsync(payload),
    };
  }
  //====================================================
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Token } from 'src/core/schemas/token.schema';
import { JwtTokenService } from '../services/jwt-token/jwt-token.service';
//=====================================================
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private _tokenService: JwtTokenService,
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

    const accessToken = await this._tokenService.generateAccessToken({
      id: foundUser.id,
    });
    const refreshToken = await this._tokenService.generateRefreshToken({
      id: foundUser.id,
    });

    const newToken = new this.tokenModel({
      user: foundUser.id,
      refresh_token: refreshToken,
    });

    await newToken.save();

    return {
      message: 'Login successfully',
      access_token: accessToken,
      refreshToken: refreshToken,
    };
  }
  //====================================================
}

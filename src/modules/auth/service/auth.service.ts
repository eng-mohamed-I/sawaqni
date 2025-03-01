import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  //====================================================
  // Refresh token
  async refreshToken(refreshToken: string) {
    const refresh_token = refreshToken;
    const foundToken = await this.tokenModel.findOne({ refresh_token });
    if (!foundToken)
      throw new HttpException('Token not found.', HttpStatus.NOT_FOUND);

    const decoded = await this._tokenService.verifyRefreshToken(refresh_token);

    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessToken = await this._tokenService.generateAccessToken({
      id: decoded.id,
    });

    return {
      message: 'Refresh token successfully',
      accessToken,
    };
  }
  //====================================================
  // Logout
  async logout(req: any, refreshToken: any) {
    const { user } = req;


    const token = await this.tokenModel.findOneAndDelete({
      refresh_token: refreshToken,
      user: user._id,
    });

    console.log(token);

    if (!token)
      throw new HttpException('Token not found.', HttpStatus.NOT_FOUND);

    return {
      message: 'Logout successfully',
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  // Generate access token
  async generateAccessToken(payload: any): Promise<string> {
    return this._jwtService.signAsync(payload, {
      secret: this._configService.get<string>('JWT_ACCESS_KEY'),
      expiresIn: this._configService.get<string>('JWT_ACCESS_EXPIRE'),
    });
  }

  // Generate refresh token
  async generateRefreshToken(payload: any): Promise<string> {
    return this._jwtService.signAsync(payload, {
      secret: this._configService.get<string>('JWT_REFRESH_KEY'),
      expiresIn: this._configService.get<string>('JWT_REFRESH_EXPIRE'),
    });
  }

  // Verify Access token
  async verifyAccessToken(token: string): Promise<any> {
    this._jwtService.verifyAsync(token, {
      secret: this._configService.get<string>('JWT_ACCESS_KEY'),
    });
  }

  // Verify refresh token
  async verifyRefreshToken(token: string): Promise<any> {
    try {
      return await this._jwtService.verifyAsync(token, {
        secret: this._configService.get<string>('JWT_REFRESH_KEY'),
      });
    } catch (error) {
      return null;
    }
  }
}

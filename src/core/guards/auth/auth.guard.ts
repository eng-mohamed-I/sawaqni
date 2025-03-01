import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { JwtTokenService } from 'src/modules/auth/services/jwt-token/jwt-token.service';
//===========================================================
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private _jwtService: JwtTokenService,
    private _reflector: Reflector,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    const isPublic = this._reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];

    const decoded = await this._jwtService.verifyAccessToken(token);

    const foundUser = await this.userModel.findById(decoded.id);
    if (!foundUser)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    request.user = foundUser;

    return true;
  }
}

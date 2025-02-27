import {
  Body,
  Controller,
  Headers,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { loginDTO, refreshTokenDTO, registerDTO } from '../dto/auth.dto';
//====================================================
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  //====================================================
  // Register
  @Post('register')
  register(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: registerDTO,
  ) {
    return this._authService.register(body);
  }
  //====================================================
  // Login
  @Post('login')
  login(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: loginDTO,
  ) {
    return this._authService.login(body);
  }
  //====================================================
  @Post('refresh-token')
  refreshToken(@Headers('x-refresh-token') refreshToken: string) {
    return this._authService.refreshToken(refreshToken);
  }
}

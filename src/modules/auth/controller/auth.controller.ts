import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { loginDTO, registerDTO } from '../dto/auth.dto';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
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
  // Refresh Token

  @Post('refresh-token')
  refreshToken(@Headers('x-refresh-token') refreshToken: string) {
    return this._authService.refreshToken(refreshToken);
  }
  //====================================================
  // Logout

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: any, @Headers('x-refresh-token') refreshToken: string) {
    return this._authService.logout(req, refreshToken);
  }
}

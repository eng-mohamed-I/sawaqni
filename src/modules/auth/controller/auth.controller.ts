import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { registerDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  // Register
  @Post('register')
  register(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: registerDTO,
  ) {
    return this._authService.register(body);
  }
}

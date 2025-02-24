import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { registerDTO } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
  // Register
  @Post('register')
  register(@Body(new ValidationPipe()) body: registerDTO) {
    return body;
  }

  // Login
  @Post('login')
  login(@Body() body: any) {}
}

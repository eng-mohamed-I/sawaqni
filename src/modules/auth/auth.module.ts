import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Token, TokenSchema } from 'src/core/schemas/token.schema';
import { JwtTokenService } from './services/jwt-token/jwt-token.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    // هنا بضطر اني احط ال access token بس لانه بيقبل secret واحد وغير كدا هو الاكثر استخداما
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRE'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService],
  exports: [JwtTokenService],
})
export class AuthModule {}

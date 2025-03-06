import { Module } from '@nestjs/common';
import { TokenController } from './controller/token.controller';
import { TokenService } from './service/token.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/core/schemas/token.schema';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from 'src/core/schemas/user.schema';
//================================================================
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
//================================================================
export class TokenModule {}

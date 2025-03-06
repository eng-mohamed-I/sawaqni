import { Module } from '@nestjs/common';
import { TokenController } from './controller/token.controller';
import { TokenService } from './service/token.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/core/schemas/token.schema';
//================================================================
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from 'src/core/schemas/token.schema';
//================================================================
@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}
  //================================================================
  // Get all tokens
  async getAllTokens() {
    const tokens = await this.tokenModel.find();
  }
  //================================================================
}

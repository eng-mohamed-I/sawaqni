import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    return { message: 'Tokens founded.', data: tokens };
  }
  //================================================================
  // Delete Token
  async deleteToken(id: string) {
    const deletedToken = await this.tokenModel.findByIdAndDelete(id);

    if (!deletedToken)
      throw new HttpException('Token not found.', HttpStatus.NOT_FOUND);

    return { message: 'Token deleted successfully.', data: deletedToken };
  }
  //================================================================
}

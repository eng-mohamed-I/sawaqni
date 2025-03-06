import { Controller, Get } from '@nestjs/common';
import { TokenService } from '../service/token.service';
//===================================================
@Controller('tokens')
export class TokenController {
  constructor(private _tokenService: TokenService) {}
  //===================================================
  // Get all tokens
  @Get('')
  getAllTokens() {
    return this._tokenService.getAllTokens();
  }
}

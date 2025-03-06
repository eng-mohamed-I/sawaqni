import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { TokenService } from '../service/token.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
//===================================================
@Controller('tokens')
export class TokenController {
  constructor(private _tokenService: TokenService) {}
  //===================================================
  // Get all tokens
  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllTokens() {
    return this._tokenService.getAllTokens();
  }
  //===================================================
  @Delete('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteToken(@Param('id') tokenId: string) {
    return this._tokenService.deleteToken(tokenId);
  }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
//======================================================
@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}
  //======================================================
  // Get All Users

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllUsers() {
    return this._userService.getAllUsers();
  }
  //======================================================
  // Get Single User
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getSingleUser(@Param('id') id: any) {
    return this._userService.getUser(id);
  }
  //======================================================
}

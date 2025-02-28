import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
//======================================================
@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}
  //======================================================
  // Get All Users

  @Get('')
  getAllUsers() {
    return this._userService.getAllUsers();
  }
  //======================================================
  // Get Single User
  @Get(':id')
  getSingleUser(@Param('id') id: any) {
    return this._userService.getUser(id);
  }
}

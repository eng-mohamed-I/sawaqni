import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
import { addUserDTO } from '../dto/user.dto';
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
  // Add User

  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  addUser(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: addUserDTO,
  ) {
    return this._userService.addUser(body);
  }
}

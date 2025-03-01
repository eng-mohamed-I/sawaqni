import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
import { addUserDTO, updateUserDTO } from '../dto/user.dto';
//======================================================
@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}
  //======================================================
  // Get All Users

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllUsers(@Query() query: any) {
    return this._userService.getAllUsers(query);
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
  //======================================================
  // Delete User

  @Delete(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteUser(@Param('userId') userId: any) {
    return this._userService.deleteUser(userId);
  }
  //======================================================
  // Update User

  @Put(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateUser(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: updateUserDTO,
    @Param('userId') userId: any,
  ) {
    return this._userService.updateUser(userId, body);
  }
}

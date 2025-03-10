import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { JwtAuthGuard } from 'src/core/guards/auth/auth.guard';
import { Roles } from 'src/core/guards/Role/role.decorator';
import { RolesGuard } from 'src/core/guards/Role/role.guard';
import { Role } from 'src/core/guards/Role/enum/role.enum';
import { addOrderDTO } from '../dto/order.dto';
//=========================================================
@Controller('orders')
export class OrderController {
  constructor(private _orderService: OrderService) {}
  //=========================================================
  @Post('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  addOrder(
    @Req() req: any,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: addOrderDTO,
  ) {
    return this._orderService.addOrder(body, req);
  }
  //=========================================================
  @Get('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  getUserOrders(@Req() req: any) {
    return this._orderService.getUserOrders(req);
  }
}

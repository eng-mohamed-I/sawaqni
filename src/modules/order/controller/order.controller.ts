import { Controller } from '@nestjs/common';
import { OrderService } from '../service/order.service';
//=========================================================
@Controller('order')
export class OrderController {
  constructor(private _orderService: OrderService) {}
  //=========================================================
}

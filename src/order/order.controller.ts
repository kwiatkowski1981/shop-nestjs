import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


// todo metoda buy musi odpalić kilka rzeczy jak:
// todo zapisz transakcje() w DB
// todo cena netto()
// todo odliczyć zakupione produkty()
// todo @mail z powiadomieniem o zakupie()
// todo sms z powiadomieniem o zakupie()
// todo wystaw fakturę()
// todo sprawdź clientScoring czy klient kwalifikuje się na isVip(Client)
// todo softDelete(Basket)
// todo wyzerować koszyk na pusty kasa 0 itd..
// todo create new Basket()

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // todo wejscie nowego zamowienia
  // todo koszyk wszystkie ceny itd
  // todo

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}


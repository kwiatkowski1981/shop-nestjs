import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductListService } from './product-list.service';
import { CreateProductListDto } from './dto/create-product-list.dto';
import { UpdateProductListDto } from './dto/update-product-list.dto';

@Controller('product-list')
export class ProductListController {
  constructor(private readonly productListService: ProductListService) {}

  @Post()
  create(@Body() createProductListDto: CreateProductListDto) {
    return this.productListService.create(createProductListDto);
  }

  @Get()
  findAll() {
    return this.productListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductListDto: UpdateProductListDto) {
    return this.productListService.update(+id, updateProductListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productListService.remove(+id);
  }
}

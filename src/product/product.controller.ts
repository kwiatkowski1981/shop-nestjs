import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  createProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
  ProductDetailInterface,
  ProductInterface,
  updateProductResponse,
} from '../types';

@Controller('products')
export class ProductController {
  constructor(@Inject(ProductService) private shopService: ProductService) {}

  @Post('/')
  @HttpCode(201)
  createNewShopItem(
    @Body() productToCreate: ProductInterface,
  ): Promise<createProductResponse> {
    return this.shopService.createNewShopItemQuery(productToCreate);
  }

  @Post('/addDetailToProduct/:productId')
  @HttpCode(201)
  createNewDetailAndSetNewUpdateDateToGivenShopItem(
    @Param('productId') productId: string,
    @Body() addDetail: ProductDetailInterface,
  ): Promise<void> {
    return this.shopService.createNewProductDetailQuery(productId, addDetail);
  }

  @Get('/')
  @HttpCode(200)
  findAllShopItems(): Promise<GetListOfProductsResponse> {
    return this.shopService.findAllProducts();
  }

  @Get(':id')
  @HttpCode(200)
  findOneShopItem(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.shopService.findProductById(id);
  }

  @Get('/findBySearchTerm/:searchTerm')
  @HttpCode(200)
  findOneShopItemBySearchTerm(
    @Param('searchTerm') searchTerm: string,
  ): Promise<GetListOfProductsResponse> {
    return this.shopService.findProductsBySearchTermQuery(searchTerm);
  }

  @Patch(':id')
  @HttpCode(204)
  updateShopItem(
    @Param('id') id: string,
    @Body() shopItemToUpdate: ProductInterface,
  ): Promise<updateProductResponse> {
    return this.shopService.updateProductById(id, shopItemToUpdate);
  }

  @Delete(':id')
  @HttpCode(204)
  removeShopItem(@Param('id') id: string) {
    return this.shopService.removeProductById(id);
  }

  @Delete('/removeDetailFromProduct/:id')
  @HttpCode(204)
  removeShopItemDetail(@Param('id') id: string) {
    return this.shopService.removeProductDetailQuery(id);
  }
}

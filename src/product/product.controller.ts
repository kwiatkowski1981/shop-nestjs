import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  createProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
  ProductDescriptionInterface,
  ProductDetailInterface,
  ProductInterface,
  updateProductResponse,
} from '../types';
import { UpdateProductDetailsDto } from './dto/update-product-details.dto';
import { UpdateProductDescriptionDto } from './dto/update-product-desription.dto';

@Controller('products')
export class ProductController {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Post('/')
  @HttpCode(201)
  createNewShopItem(
    @Body() productToCreate: ProductInterface,
  ): Promise<createProductResponse> {
    return this.productService.createNewProductQuery(productToCreate);
  }

  @Post('/addDetailToProduct/:productId')
  @HttpCode(201)
  createNewDetailOnGivenProduct(
    @Param('productId') productId: string,
    @Body() addDetail: ProductDetailInterface,
  ): Promise<void> {
    return this.productService.createNewProductDetailQuery(
      productId,
      addDetail,
    );
  }

  @Post('/addDescriptionToProduct/:productId')
  @HttpCode(201)
  createNewDescriptionOnGivenProduct(
    @Param('productId') productId: string,
    @Body() addDescription: ProductDescriptionInterface,
  ): Promise<void> {
    return this.productService.createNewProductDescriptionQuery(
      productId,
      addDescription,
    );
  }

  @Get('/')
  @HttpCode(200)
  findAllProducts(): Promise<GetListOfProductsResponse> {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  @HttpCode(200)
  findProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.productService.findProductById(id);
  }

  @Get('/findBySearchTerm/:searchTerm')
  @HttpCode(200)
  findProductBySearchTerm(
    @Param('searchTerm') searchTerm: string,
  ): Promise<GetListOfProductsResponse> {
    return this.productService.findProductsBySearchTermQuery(searchTerm);
  }

  @Patch(':id')
  @HttpCode(204)
  updateProduct(
    @Param('id') id: string,
    @Body() productToUpdate: ProductInterface,
  ): Promise<updateProductResponse> {
    return this.productService.updateProductById(id, productToUpdate);
  }
  // todo ************************************************************************************************
  @Patch(':id')
  @HttpCode(204)
  public async updateProductDetails(
    @Param('id') id: string,
    @Body() productDetailsToUpdate: UpdateProductDetailsDto,
  ): Promise<UpdateProductDetailsDto> {
    const { details } = await this.productService.findProductById(id);
    if (!details) {
      throw new NotFoundException();
    }
    return this.productService.updateProductDetailsQuery(
      details,
      productDetailsToUpdate,
    );
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateProductDescription(
    @Param('id') id: string,
    @Body() productDescriptionToUpdate: UpdateProductDescriptionDto,
  ): Promise<UpdateProductDescriptionDto> {
    const { description } = await this.productService.findProductById(id);
    if (!description) {
      throw new NotFoundException();
    }
    return this.productService.updateProductDescriptionQuery(
      description,
      productDescriptionToUpdate,
    );
  }
  // todo ************************************************************************************************
  @Delete(':id')
  @HttpCode(204)
  removeShopItem(@Param('id') id: string) {
    return this.productService.removeProductById(id);
  }

  @Delete('/removeDetailFromProduct/:id')
  @HttpCode(204)
  removeShopItemDetail(@Param('id') id: string) {
    return this.productService.removeProductDetailQuery(id);
  }

  @Delete('/removeDescriptionFromProduct/:id')
  @HttpCode(204)
  removeProductDescription(@Param('id') id: string) {
    return this.productService.removeProductDescriptionQuery(id);
  }
}

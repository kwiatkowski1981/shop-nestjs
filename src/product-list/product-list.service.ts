import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateProductListDto } from './dto/create-product-list.dto';
import { UpdateProductListDto } from './dto/update-product-list.dto';
// import { ProductService } from '../product/product.service';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductListService {
  private readonly logger = new Logger(ProductListService.name);
  constructor(
    // @Inject(forwardRef(() => ProductService))
    // private productService: ProductService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  create(createProductListDto: CreateProductListDto) {
    return 'This action adds a new productList';
  }

  findAll() {
    return `This action returns all productList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productList`;
  }

  update(id: number, updateProductListDto: UpdateProductListDto) {
    return `This action updates a #${id} productList`;
  }

  remove(id: number) {
    return `This action removes a #${id} productList`;
  }
}

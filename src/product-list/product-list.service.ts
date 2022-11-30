import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductListDto } from './dto/create-product-list.dto';
import { UpdateProductListDto } from './dto/update-product-list.dto';
// import { ProductService } from '../product/product.service';
import { DataSource } from 'typeorm';
import { ProductList } from './entities/product-list.entity';

@Injectable()
export class ProductListService {
  private readonly logger = new Logger(ProductListService.name);
  constructor(
    // @Inject(forwardRef(() => ProductService))
    // private productService: ProductService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  private dbBaseQuery() {
    return this.dataSource.createQueryBuilder();
  }

  public async create(newList: CreateProductListDto) {
    const query = await this.dbBaseQuery()
      .insert()
      .into(ProductList)
      .values(newList)
      .execute();
    this.logger.debug({ query });
    return query;
  }

  public async findAll() {
    this.logger.debug(`Printing all DB Product List`);
    return await this.dbBaseQuery()
      .select('productList')
      .from(ProductList, 'productList')
      .orderBy('productList.id', 'DESC')
      .leftJoinAndSelect('productList.product', 'product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.description', 'description')
      .getMany();
  }

  public async findOne(id: string) {
    this.logger.debug(`Printing all DB Product List`);
    return await this.dbBaseQuery()
      .select('productList')
      .from(ProductList, 'productList')
      .where('id = :id', { id })
      .orderBy('productList.id', 'DESC')
      .leftJoinAndSelect('productList.product', 'product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.description', 'description')
      .getMany();
  }

  public async update(listId: string, input: UpdateProductListDto) {
    this.logger.debug(
      `Update encji ProductDescriptionEntity wyszukanej po id: ${listId}`,
    );
    const productList = await this.findOne(listId);
    this.logger.debug({ productList });
    if (!productList) {
      throw new NotFoundException();
    }
    return await ProductList.save({
      ...input,
    });
  }

  public async remove(id: number) {
    return `This action removes a #${id} productList`;
  }
}

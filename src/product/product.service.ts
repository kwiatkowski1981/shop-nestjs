import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { DataSource } from 'typeorm';
import { BasketService } from '../basket/basket.service';
import {
  createProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
  ProductDetailInterface,
  ProductInterface,
  updateProductResponse,
} from '../types';
import { ProductDetailsEntity } from './entities/product-details.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  private dbBaseQuery() {
    return this.dataSource.createQueryBuilder();
  }

  private async getProductDetailId(addDetailQuery: createProductResponse) {
    const { identifiers } = addDetailQuery;
    const [{ id }] = identifiers;
    this.logger.debug(`to id dostaje po stworzeniu productDetail o ID: ${id}`);
    return id;
  }

  private async setOneToOneEntityRelation(
    shopItemId: string,
    ShopItemDetailId: string,
    propertyName: string,
  ) {
    return await this.dbBaseQuery()
      .relation(ProductEntity, propertyName)
      .of(shopItemId)
      .set(ShopItemDetailId);
  }

  private async removeOneToOneEntityRelation(
    shopItemId: string,
    entity: any,
    propertyName: string,
  ) {
    return await this.dbBaseQuery()
      .relation(entity, propertyName)
      .of(shopItemId)
      .set(null);
  }

  private async removeOneItemById(id: string, entity: any) {
    this.logger.debug(`Deleting a Product with id: ${id}`);
    return this.dataSource
      .createQueryBuilder()
      .delete()
      .from(entity)
      .where('id = :id', { id })
      .execute();
  }

  public async createNewShopItemQuery(
    productToCreate: ProductInterface,
  ): Promise<createProductResponse> {
    this.logger.debug('Creating new Product');
    const query = await this.dbBaseQuery()
      .insert()
      .into(ProductEntity)
      .values([{ ...productToCreate }])
      .execute();
    this.logger.debug({ query });
    return query;
  }

  public async createNewProductDetailQuery(
    productId: string,
    addDetail: ProductDetailInterface,
  ): Promise<void> {
    const product = await this.findProductById(productId);
    this.logger.debug({ product });
    if (product.details.id !== null) {
      throw new BadRequestException('Product already exists');
    }
    const addDetailQuery = await this.dbBaseQuery()
      .insert()
      .into(ProductDetailsEntity)
      .values([{ ...addDetail }])
      .execute();
    const productDetailId = await this.getProductDetailId(addDetailQuery);
    return await this.setOneToOneEntityRelation(
      productId,
      productDetailId,
      'details',
    );
  }

  public async findAllProducts(): Promise<GetListOfProductsResponse> {
    this.logger.debug(`Printing all DB Products`);
    return await this.dbBaseQuery()
      .select('product')
      .from(ProductEntity, 'product')
      .orderBy('product.id', 'DESC')
      .leftJoinAndSelect('product.details', 'details')
      .getMany();
  }

  public async findProductsBySearchTermQuery(
    searchTerm: string,
  ): Promise<GetListOfProductsResponse> {
    this.logger.debug(
      `Printing the product found by searchTerm: "${searchTerm}" `,
    );
    return await this.dbBaseQuery()
      .select('product')
      .from(ProductEntity, 'product')
      .where('product.description LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .leftJoinAndSelect('product.details', 'details')
      .orderBy('product.id', 'DESC')
      .getMany();
  }

  public async findProductById(id: string): Promise<GetOneProductResponse> {
    this.logger.debug(`Printing the ShopItem with id: ${id}`);
    return await this.dbBaseQuery()
      .select('product')
      .from(ProductEntity, 'product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.details', 'details')
      .getOne();
  }

  public async updateProductById(
    id: string,
    shopItemToUpdate: ProductInterface,
  ): Promise<updateProductResponse> {
    this.logger.debug(`Updating the Product with id: ${id}`);
    const updateQuery = await this.dbBaseQuery()
      .update(ProductEntity)
      .set({
        ...shopItemToUpdate,
      })
      .where('id = :id', { id })
      .execute();
    this.logger.debug({ updateQuery });
    // UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    return updateQuery;
  }

  public async removeProductById(shopItemId: string) {
    return this.removeOneItemById(shopItemId, ProductEntity);
  }

  public async removeProductDetailQuery(shopItemId: string) {
    const { details } = await this.findProductById(shopItemId);
    await this.removeOneToOneEntityRelation(
      shopItemId,
      ProductEntity,
      'details',
    );
    // await this.setLastUpdateAtValue(shopItemId);
    return await this.removeOneItemById(details.id, ProductDetailsEntity);
  }
}

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { DataSource } from 'typeorm';
import { BasketService } from '../basket/basket.service';
import {
  createProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
  ProductDescriptionInterface,
  ProductDetailInterface,
  ProductInterface,
  updateProductResponse,
} from '../types';
import { ProductDetailsEntity } from './entities/product-details.entity';
import { ProductDescriptionEntity } from './entities/product-description.entity';
import { UpdateProductDetailsDto } from './dto/update-product-details.dto';
import { UpdateProductDescriptionDto } from './dto/update-product-desription.dto';

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

  private async createNewItemQuery(
    itemToCreate: any, // itemToCreate <T> have to be the Interface of item to create
    entity: any, // Entity of item to create
  ): Promise<createProductResponse> {
    const query = await this.dbBaseQuery()
      .insert()
      .into(entity)
      .values([{ ...itemToCreate }])
      .execute();
    this.logger.debug({ query });
    return query;
  }

  private async getProductDetailId(addDetailQuery: createProductResponse) {
    const { identifiers } = addDetailQuery;
    const [{ id }] = identifiers;
    return id;
  }

  private async setOneToOneEntityRelation(
    productId: string,
    productPropertyId: string,
    propertyName: string,
  ): Promise<void> {
    return await this.dbBaseQuery()
      .relation(ProductEntity, propertyName)
      .of(productId)
      .set(productPropertyId);
  }

  private async removeOneToOneEntityRelation(
    productId: string,
    entity: any,
    propertyName: string,
  ): Promise<void> {
    this.logger.debug('removing relation');
    return await this.dbBaseQuery()
      .relation(entity, propertyName)
      .of(productId)
      .set(null);
  }

  private async removeOneItemById(id: string, entity: any) {
    return this.dataSource
      .createQueryBuilder()
      .delete()
      .from(entity)
      .where('id = :id', { id })
      .execute();
  }

  public async createNewProductQuery(
    productToCreate: ProductInterface,
  ): Promise<createProductResponse> {
    return await this.createNewItemQuery(productToCreate, ProductEntity);
  }

  public async createNewProductDetailQuery(
    productId: string,
    addDetail: ProductDetailInterface,
  ): Promise<void> {
    const product = await this.findProductById(productId);
    if (product.details !== null) {
      throw new BadRequestException('Product Detail already exists');
    }
    const addDetailQuery = await this.createNewItemQuery(
      addDetail,
      ProductDetailsEntity,
    );
    const productDetailId = await this.getProductDetailId(addDetailQuery);
    return await this.setOneToOneEntityRelation(
      productId,
      productDetailId,
      'details',
    );
  }

  public async createNewProductDescriptionQuery(
    productId: string,
    addDescription: ProductDescriptionInterface,
  ): Promise<void> {
    const product = await this.findProductById(productId);
    if (product.description !== null) {
      throw new BadRequestException('Product Description already exists');
    }
    const addDescriptionQuery = await this.createNewItemQuery(
      addDescription,
      ProductDescriptionEntity,
    );
    const productDescriptionId = await this.getProductDetailId(
      addDescriptionQuery,
    );
    return await this.setOneToOneEntityRelation(
      productId,
      productDescriptionId,
      'description',
    );
  }

  public async findAllProducts(): Promise<GetListOfProductsResponse> {
    this.logger.debug(`Printing all DB Products`);
    return await this.dbBaseQuery()
      .select('product')
      .from(ProductEntity, 'product')
      .orderBy('product.id', 'DESC')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.description', 'description')
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
      .leftJoinAndSelect('product.description', 'description')
      .orderBy('product.id', 'DESC')
      .getMany();
  }

  public async findProductById(id: string): Promise<GetOneProductResponse> {
    this.logger.debug(`Printing the Product with id: ${id}`);
    return await this.dbBaseQuery()
      .select('product')
      .from(ProductEntity, 'product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.description', 'description')
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
  // todo ************************************************************************************************
  public async updateProductDetailsQuery(
    details: ProductDetailsEntity,
    detailToUpdate: UpdateProductDetailsDto,
  ): Promise<ProductDetailsEntity> {
    this.logger.debug(`Update encji ProductDetailsEntity wyszukanej po id`);
    return await ProductDetailsEntity.save({
      ...details,
      ...detailToUpdate,
    });
  }

  public async updateProductDescriptionQuery(
    description: ProductDescriptionEntity,
    descriptionToUpdate: UpdateProductDescriptionDto,
  ) {
    this.logger.debug(`Update encji ProductDescriptionEntity wyszukanej po id`);
    return await ProductDetailsEntity.save({
      ...description,
      ...descriptionToUpdate,
    });
  }
  // todo ************************************************************************************************
  public async removeProductDetailQuery(productId: string) {
    const { details } = await this.findProductById(productId);
    await this.removeOneToOneEntityRelation(
      productId,
      ProductEntity,
      'details',
    );
    this.logger.debug(`Deleting the ProductDetail with id: ${details.id}`);
    return await this.removeOneItemById(details.id, ProductDetailsEntity);
  }

  public async removeProductDescriptionQuery(productId: string) {
    const { description } = await this.findProductById(productId);
    await this.removeOneToOneEntityRelation(
      productId,
      ProductEntity,
      'description',
    );
    this.logger.debug(
      `Deleting the ProductDescription with id: ${description.id}`,
    );
    return await this.removeOneItemById(
      description.id,
      ProductDescriptionEntity,
    );
  }

  public async removeProductById(productId: string) {
    const { details, description } = await this.findProductById(productId);
    if (details) {
      await this.removeProductDetailQuery(productId);
    }
    if (description) {
      await this.removeProductDetailQuery(productId);
    }
    this.logger.debug(`Deleting a Product with id: ${productId}`);
    return this.removeOneItemById(productId, ProductEntity);
  }
}
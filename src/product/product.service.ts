import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { DataSource, InsertResult } from 'typeorm';
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
import { ProductDetail } from './entities/product-details.entity';
import { ProductDescription } from './entities/product-description.entity';
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
  ): Promise<InsertResult> {
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
      .relation(Product, propertyName)
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
    return await this.createNewItemQuery(productToCreate, Product);
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
      ProductDetail,
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
      ProductDescription,
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
      .from(Product, 'product')
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
      .from(Product, 'product')
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
      .from(Product, 'product')
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
      .update(Product)
      .set({
        ...shopItemToUpdate,
      })
      .where('id = :id', { id })
      .execute();
    this.logger.debug({ updateQuery });
    // UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    return updateQuery;
  }

  public async updateProductDetailsQuery(
    details: ProductDetail,
    input: UpdateProductDetailsDto,
  ): Promise<ProductDetail> {
    this.logger.debug(
      `Update encji ProductDetailsEntity wyszukanej po id ${details.id}`,
    );
    return await ProductDetail.save({
      ...details,
      ...input,
    });
  }

  public async updateProductDescriptionQuery(
    description: ProductDescription,
    input: UpdateProductDescriptionDto,
  ): Promise<ProductDescription> {
    this.logger.debug(
      `Update encji ProductDescriptionEntity wyszukanej po id: ${description.id}`,
    );
    return await ProductDescription.save({
      ...description,
      ...input,
    });
  }

  public async removeProductDetailQuery(productId: string) {
    const { details } = await this.findProductById(productId);
    await this.removeOneToOneEntityRelation(productId, Product, 'details');
    this.logger.debug(`Deleting the ProductDetail with id: ${details.id}`);
    return await this.removeOneItemById(details.id, ProductDetail);
  }

  public async removeProductDescriptionQuery(productId: string) {
    const { description } = await this.findProductById(productId);
    await this.removeOneToOneEntityRelation(productId, Product, 'description');
    this.logger.debug(
      `Deleting the ProductDescription with id: ${description.id}`,
    );
    return await this.removeOneItemById(description.id, ProductDescription);
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
    return this.removeOneItemById(productId, Product);
  }
}

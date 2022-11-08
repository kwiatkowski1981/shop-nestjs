import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductService } from '../product/product.service';
import { BasketEntity } from './entities/basket.entity';
import {
  BasketInterface,
  createBasketResponse,
  getBasketResponse,
  updateBasketResponse,
} from '../types';

@Injectable()
export class BasketService {
  private readonly logger = new Logger(BasketService.name);
  constructor(
    @Inject(forwardRef(() => ProductService))
    private readonly shopService: ProductService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  private dbBaseQuery() {
    return this.dataSource.createQueryBuilder();
  }

  public async createNewBasketQuery(): Promise<createBasketResponse> {
    this.logger.debug('Creating a new Basket');
    const query = await this.dbBaseQuery()
      .insert()
      .into(BasketEntity)
      .values([])
      .execute();
    this.logger.debug({ query });
    return query;
  }

  public async addShopItemToTheBasketQuery(
    shopItemToInput: BasketInterface,
  ): Promise<createBasketResponse> {
    this.logger.debug('Adding ShopItems to the Basket');
    const query = await this.dbBaseQuery()
      .insert()
      .into(BasketEntity)
      .values([{ ...shopItemToInput }])
      .execute();
    this.logger.debug({ query });
    return query;
  }

  public async findAllBasketsQuery(): Promise<BasketInterface[]> {
    this.logger.debug(`Printing all DB BasketProducts`);
    return await this.dbBaseQuery()
      .select('basketProduct')
      .from(BasketEntity, 'basketProduct')
      .orderBy('basketProduct.id', 'DESC')
      .getMany();
  }

  public async findBasketByIdQuery(id: string): Promise<getBasketResponse> {
    this.logger.debug(`Printing BasketProduct with ID: ${id}.`);
    return await this.dbBaseQuery()
      .select('basketProduct')
      .from(BasketEntity, 'basketProduct')
      .where('basketProduct.id = :id', { id })
      .getOneOrFail();
  }

  public async updateBasketQuery(
    basket: BasketInterface,
    itemToUpdate: BasketInterface,
  ): Promise<updateBasketResponse> {
    return await BasketEntity.save({
      ...basket,
      ...itemToUpdate,
    });
  }

  public async removeBasketQuery(id: string) {
    this.logger.debug(`Deleting a BasketEntity with ID: ${id}`);
    return await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(BasketEntity)
      .where('id = :id', { id })
      .execute();
  }
}

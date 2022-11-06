import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource, InsertResult } from 'typeorm';
import { ShopService } from '../shop/shop.service';
import { BasketEntity } from './entities/basket.entity';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { BasketInterface } from '../types';

@Injectable()
export class BasketService {
  private readonly logger = new Logger(BasketService.name);
  constructor(
    @Inject(forwardRef(() => ShopService))
    private readonly shopService: ShopService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  private dbBaseQuery() {
    return this.dataSource.createQueryBuilder();
  }

  public async createNewBasketQuery(): Promise<InsertResult> {
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
  ): Promise<InsertResult> {
    this.logger.debug('Adding ShopItems to the Basket');
    const query = await this.dbBaseQuery()
      .insert()
      .into(BasketEntity)
      .values([{ ...shopItemToInput }])
      .execute();
    this.logger.debug({ query });
    return query;
  }

  public async findAll(): Promise<BasketInterface[]> {
    this.logger.debug(`Printing all DB BasketItems`);
    return await this.dbBaseQuery()
      .select('basketItem')
      .from(BasketEntity, 'basketItem')
      .orderBy('basketItem.id', 'DESC')
      // .leftJoinAndSelect('shopItem.items', 'items')
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}

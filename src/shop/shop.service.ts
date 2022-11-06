import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ShopItemEntity } from './entities/shop-item.entity';
import { DataSource } from 'typeorm';
import { BasketService } from '../basket/basket.service';
import {
  createShopItemResponse,
  GetListOfShopItemsResponse,
  GetOneShopItemResponse,
  ShopItemDetailInterface,
  ShopItemInterface,
  updateShopItemResponse,
} from '../types';
import { ShopItemDetailsEntity } from './entities/shop-item-details.entity';

@Injectable()
export class ShopService {
  private readonly logger = new Logger(ShopService.name);
  constructor(
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  private dbBaseQuery() {
    return this.dataSource.createQueryBuilder();
  }

  private setLastUpdateAtValue(shopItemId: string) {
    return this.dbBaseQuery()
      .update(ShopItemEntity)
      .set({
        lastUpdateAt: new Date(),
      })
      .where('id = :id', { id: shopItemId })
      .execute();
  }

  private async getShopItemDetailId(addDetailQuery: createShopItemResponse) {
    const { identifiers } = addDetailQuery;
    const [{ id }] = identifiers;
    this.logger.debug(`to id dostaje po stworzeniu shopItemDetail o ID: ${id}`);
    return id;
  }

  private async setOneToOneEntityRelation(
    shopItemId: string,
    ShopItemDetailId: string,
    propertyName: string,
  ) {
    return await this.dbBaseQuery()
      .relation(ShopItemEntity, propertyName)
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
    this.logger.debug(`Deleting a ShopItem with id: ${id}`);
    return this.dataSource
      .createQueryBuilder()
      .delete()
      .from(entity)
      .where('id = :id', { id })
      .execute();
  }

  public async createNewShopItemQuery(
    productToCreate: ShopItemInterface,
  ): Promise<createShopItemResponse> {
    this.logger.debug('Creating a new ShopItem');
    const query = await this.dbBaseQuery()
      .insert()
      .into(ShopItemEntity)
      .values([{ ...productToCreate }])
      .execute();
    this.logger.debug({ query });
    return query;
  }

  public async createNewShopItemDetailAndSetLastUpdateAtValueToNewDateQuery(
    shopItemId: string,
    addDetail: ShopItemDetailInterface,
    // return this.setOneToOneEntityRelation(shopItemId, id, 'shopItem'); nie zwraca nic czyli typ Void
  ): Promise<void> {
    const shopItem = await this.findOneShopItemById(shopItemId);
    this.logger.debug({ shopItem });
    if (shopItem.details.id !== null) {
      throw new BadRequestException('Item already exists');
    }
    const addDetailQuery = await this.dbBaseQuery()
      .insert()
      .into(ShopItemDetailsEntity)
      .values([{ ...addDetail }])
      .execute();
    this.logger.debug({ addDetailQuery });
    const ShopItemDetailId = await this.getShopItemDetailId(addDetailQuery);
    this.logger.debug({ ShopItemDetailId });
    await this.setLastUpdateAtValue(shopItemId);
    return await this.setOneToOneEntityRelation(
      shopItemId,
      ShopItemDetailId,
      'details',
    );
  }

  public async findAllShopItems(): Promise<GetListOfShopItemsResponse> {
    this.logger.debug(`Printing all DB ShopItems`);
    return await this.dbBaseQuery()
      .select('shopItem')
      .from(ShopItemEntity, 'shopItem')
      .orderBy('shopItem.id', 'DESC')
      .leftJoinAndSelect('shopItem.details', 'details')
      .getMany();
  }

  public async findShopItemsBySearchTermQuery(
    searchTerm: string,
  ): Promise<GetListOfShopItemsResponse> {
    this.logger.debug(
      `Printing the shopItem found by searchTerm: "${searchTerm}" `,
    );
    return await this.dbBaseQuery()
      .select('shopItem')
      .from(ShopItemEntity, 'shopItem')
      .where('shopItem.description LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .leftJoinAndSelect('shopItem.details', 'details')
      .orderBy('shopItem.id', 'DESC')
      .getMany();
  }

  public async findOneShopItemById(
    id: string,
  ): Promise<GetOneShopItemResponse> {
    this.logger.debug(`Printing the ShopItem with id: ${id}`);
    return await this.dbBaseQuery()
      .select('shopItem')
      .from(ShopItemEntity, 'shopItem')
      .where('shopItem.id = :id', { id })
      .leftJoinAndSelect('shopItem.details', 'details')
      .getOne();
  }

  public async updateOneShopItemById(
    id: string,
    shopItemToUpdate: ShopItemInterface,
  ): Promise<updateShopItemResponse> {
    this.logger.debug(`Updating the ShopItem with id: ${id}`);
    const updateQuery = await this.dbBaseQuery()
      .update(ShopItemEntity)
      .set({
        ...shopItemToUpdate,
        lastUpdateAt: new Date(),
      })
      .where('id = :id', { id })
      .execute();
    this.logger.debug({ updateQuery });
    // UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    return updateQuery;
  }

  public async removeOneShopItemById(shopItemId: string) {
    return this.removeOneItemById(shopItemId, ShopItemEntity);
  }

  public async removeShopItemDetailQuery(shopItemId: string) {
    const { details } = await this.findOneShopItemById(shopItemId);
    await this.removeOneToOneEntityRelation(
      shopItemId,
      ShopItemEntity,
      'details',
    );
    await this.setLastUpdateAtValue(shopItemId);
    return await this.removeOneItemById(details.id, ShopItemDetailsEntity);
  }
}

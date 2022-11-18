import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductService } from '../product/product.service';
import { BasketEntity } from './entities/basket.entity';
import {
  BasketInterface,
  createBasketResponse,
  getBasketResponse,
  ProductInterface,
  updateBasketResponse,
} from '../types';
import { ProductEntity } from '../product/entities/product.entity';

@Injectable()
export class BasketService {
  private readonly logger = new Logger(BasketService.name);
  constructor(
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  private async createNewBasket2(): Promise<BasketInterface> {
    return BasketEntity.createNewBasket();
  }

  private dbBaseQuery() {
    return this.dataSource.createQueryBuilder();
  }

  public async createNewBasketQuery(): Promise<createBasketResponse> {
    this.logger.debug('Creating a new Basket');
    const query = await this.dbBaseQuery()
      .insert()
      .into(BasketEntity)
      .values(new BasketEntity())
      .execute();
    this.logger.debug({ query });
    return query;
  }

  // todo dodawanie nowego przedmiotu to musi byc update koszyka
  public async addShopItemToTheBasketQuery(
    basketId: string,
    productId: string,
  ) {
    this.logger.debug(
      `I'm looking for a shopping cart in the store's DataBank..`,
    );
    const basket = await this.findBasketByIdQuery(basketId);
    if (!basket.id) {
      throw new NotFoundException('Basket not found!');
    }
    const { products } = basket;
    if (!basket.isEmpty && basket.products === []) {
      this.logger.debug('Basket is not empty!!!');
      this.logger.debug([products]);
      // throw new ForbiddenException('Nihoooojaaaaaaaa!');
    }

    this.logger.debug(`I'm looking for a Product in the store's DataBank..`);
    const [id] = Object.values(productId);
    const product = await this.productService.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    this.logger.debug('Adding Products to the Basket');
    // todo nie wiem jak dodac produkt do koszyka..

    // todo  NIE ROBIC TEGO QUERYBUILDEREM !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return await BasketEntity.save({
      ...basket,
      products: [...basket.products, product],
      isEmpty: false,
      basketBrutto: product.price,
    });

    // const updateQuery = await this.dbBaseQuery()
    //   .update(BasketEntity)
    //   .set({
    //     ...basket,
    //     products: [{ ...product }],
    //     isEmpty: false,
    //     basketBrutto: product.price,
    //   })
    //   .where('id = :basketId', { basketId })
    //   .execute();
    // this.logger.debug({ updateQuery });
    // return updateQuery;
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

import {
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
  updateBasketResponse,
} from '../types';
import { CalculateProductPrice } from '../calculations/calculate.product-price';
import { CalculateProductTax } from '../calculations/calculate.vat';

@Injectable()
export class BasketService {
  private readonly logger = new Logger(BasketService.name);
  constructor(
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
    @Inject(DataSource) private dataSource: DataSource,
    @Inject(CalculateProductPrice)
    private calculateProductPrice: CalculateProductPrice,
    @Inject(CalculateProductTax)
    private calculateProductTax: CalculateProductTax,
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

  public async addProductToTheBasketByUpdatingItQuery(
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
    if (basket.products === []) {
      // Todo jak tablica [ ...jest pusta ] to krzycz !!!!!!!

      this.logger.debug('Basket is empty!!!');
      // this.logger.debug([products]);
    } else if (basket.products !== []) {
      this.logger.error('Basket is not empty!!!');
      // this.logger.debug([products]);
      // throw new ForbiddenException('Nihoooojaaaaaaaa!');
    }
    this.logger.debug(`I'm looking for a Product in the store's DataBank..`);
    const [id] = Object.values(productId);
    const product = await this.productService.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    // todo jak wstawić basketBrutto: finalTaxedPrice
    const finalPrice =
      this.calculateProductPrice.calculateTotalBruttoPrice(products);
    const finalTaxedPrice =
      this.calculateProductTax.calculateProductBruttoPrice(finalPrice);
    this.logger.error(finalTaxedPrice);

    return await BasketEntity.save({
      ...basket,
      products: [...basket.products, product],
      isEmpty: false,
      basketBrutto: Number(finalTaxedPrice),
    });

    // const updateQuery = await this.dbBaseQuery()
    //   .update(BasketEntity)
    //   .set({
    //     ...basket,
    //     products: [{ ...basket.products }, { product }],
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
      .leftJoinAndSelect('basketProduct.products', 'product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.description', 'description')
      .getMany();
  }

  public async findBasketByIdQuery(id: string): Promise<getBasketResponse> {
    this.logger.debug(`Printing BasketProduct with ID: ${id}.`);
    return await this.dbBaseQuery()
      .select('basketProduct')
      .from(BasketEntity, 'basketProduct')
      .where('basketProduct.id = :id', { id })
      .leftJoinAndSelect('basketProduct.products', 'product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.description', 'description')
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

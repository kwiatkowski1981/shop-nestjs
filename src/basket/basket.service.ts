import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductService } from '../product/product.service';
import { Basket } from './entities/basket.entity';
import {
  BasketInterface,
  createBasketResponse,
  getBasketResponse,
  ProductInterface,
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

  // todo metoda buy musi odpalić kilka rzeczy jak:
  // todo zapisz transakcje() w DB
  // todo cena netto()
  // todo odliczyć zakupione produkty()
  // todo @mail z powiadomieniem o zakupie()
  // todo sms z powiadomieniem o zakupie()
  // todo wystaw fakturę()
  // todo sprawdź clientScoring czy klient kwalifikuje się na isVip(Client)
  // todo softDelete(Basket)
  // todo wyzerować koszyk na pusty kasa 0 itd..
  // todo create new Basket()

  private async createNewBasket2(): Promise<BasketInterface> {
    return Basket.createNewBasket();
  }

  private dbBaseQuery() {
    return this.dataSource.createQueryBuilder();
  }

  public async createNewBasketQuery(): Promise<createBasketResponse> {
    this.logger.debug('Creating a new Basket');
    const query = await this.dbBaseQuery()
      .insert()
      .into(Basket)
      .values(new Basket())
      .execute();
    this.logger.debug({ query });
    return query;
  }

  public async addProductToTheBasketByUpdatingItQuery(
    basketId: string,
    productId: string,
  ) {
    const basket = await this.findBasketByIdQuery(basketId);
    if (!basket.id) {
      throw new NotFoundException('Basket not found!');
    }
    const { products } = basket;
    if (basket.products === []) {
      // Todo jak tablica [ ...jest pusta ] to krzycz !!!!!!!
    } else if (basket.products !== []) {
      this.logger.error('Basket is not empty!!!');
      // throw new ForbiddenException('Nihoooojaaaaaaaa!');
    }
    const [id] = Object.values(productId);
    const product = await this.productService.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    const finalTaxedPrice =
      this.calculateProductTax.calculateProductBruttoPrice(
        this.calculateProductPrice.calculateTotalBruttoPrice(products),
      );
    this.logger.debug(finalTaxedPrice);
    return await Basket.save({
      ...basket,
      products: [...products, product],
      isEmpty: false,
      basketBrutto: Number(finalTaxedPrice),
    });
  }

  public async findAllBasketsQuery(): Promise<BasketInterface[]> {
    this.logger.debug(`Printing all DB BasketProducts`);
    return await this.dbBaseQuery()
      .select('basketProduct')
      .from(Basket, 'basketProduct')
      .orderBy('basketProduct.id', 'DESC')
      .leftJoinAndSelect('basketProduct.products', 'product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.description', 'description')
      .getMany();
  }

  public async findBasketByIdQuery(id: string): Promise<getBasketResponse> {
    this.logger.debug(`Printing Basket by ID: ${id}.`);
    return await this.dbBaseQuery()
      .select('basketProduct')
      .from(Basket, 'basketProduct')
      .where('basketProduct.id = :id', { id })
      .leftJoinAndSelect('basketProduct.products', 'product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.description', 'description')
      .getOneOrFail();
  }

  public async updateBasketQuery(
    basket: BasketInterface,
    itemToAdd: ProductInterface,
  ) {
    const { products } = basket;
    const finalTaxedPrice =
      this.calculateProductTax.calculateProductBruttoPrice(
        this.calculateProductPrice.calculateTotalBruttoPrice(products),
      );
    this.logger.verbose({ basket });
    this.logger.verbose(products);
    return await Basket.save({
      ...basket,
      products: [...products, itemToAdd],
      isEmpty: false,
      basketBrutto: Number(finalTaxedPrice),
    });
  }

  public async removeBasketQuery(id: string) {
    this.logger.debug(`Deleting a BasketEntity with ID: ${id}`);
    return await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Basket)
      .where('id = :id', { id })
      .execute();
  }
}

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { ProductInterface } from '../../types';
import { ShopEntity } from '../../shop/entities/shop.entity';

@Entity()
export class BasketEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  canStayInBasket: Date;

  @Column({
    default: 3600,
  })
  itemRemoveCountdown: number;

  @Column({
    type: 'decimal',
    nullable: true,
    default: 0,
    precision: 10,
    scale: 2,
  })
  basketBrutto: number;

  @Column({
    default: true,
  })
  isEmpty: boolean;

  @ManyToMany(() => ProductEntity, (product: ProductEntity) => product.baskets)
  @JoinTable()
  products: ProductEntity[];

  @ManyToMany(() => ShopEntity, (shop: ShopEntity) => shop.baskets)
  shopId: ShopEntity;

  productsCount: number;

  constructor() {
    super();
  }

  static createNewBasket() {
    return new BasketEntity();
  }
}

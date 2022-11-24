import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class Basket extends BaseEntity {
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

  @ManyToMany(() => Product, (product: Product) => product.baskets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  products: Product[];

  @ManyToMany(() => Shop, (shop: Shop) => shop.baskets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  shopId: Shop;

  productsCount: number;

  constructor() {
    super();
  }

  static createNewBasket() {
    return new Basket();
  }
}
